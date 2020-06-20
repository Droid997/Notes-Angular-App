import { Router } from '@angular/router';
import { FireAuthService } from './../services/fire-auth.service';
import {FireDatabaseService,DetailNote} from './../services/fire-database.service';
import {Component,OnInit,OnDestroy} from '@angular/core';
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit,OnDestroy {

  title:string;
  content:string;
  note:DetailNote;
  constructor(private localAPIService: FireDatabaseService,private localAuthService:FireAuthService,private router:Router) {
    this.localAPIService.detailnote.subscribe(oNote=>this.note=oNote);
  }

  ngOnInit(): void {
    this.registerEventListners()
  }

  ngAfterViewChecked(){
    let textArrea=window.document.getElementById('note-content');
    M.textareaAutoResize(textArrea)
  }

  registerEventListners() {
    window.document.getElementById('note-save').addEventListener("click", this.save.bind(this))
    // let textArea=window.document.getElementById('note-content');
    // textArea.addEventListener('focusout',(function(event){
    //   debugger;
    //   textArea.focus();
    // }).bind(this));
  
  }
  unRegisterEventListners(){
    window.document.getElementById('note-save').removeEventListener("click",this.save)
  }

  async save(event:Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    const uuid=this.localAuthService.uuid;
    const title=this.note.title.trim();
    const content=this.note.content.trim();
    const note_id=this.note.note_id;
    try {
      await this.localAPIService.save(uuid, title,content,note_id);
      this.router.navigate(["/nav/list"]);
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(){
    debugger;
    this.unRegisterEventListners();
  }

}
