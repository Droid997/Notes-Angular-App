import { FireDatabaseService,DetailNote } from './../services/fire-database.service';
import { Router, NavigationEnd } from '@angular/router';
import { FireAuthService } from '../services/fire-auth.service';
import { Component, OnInit} from '@angular/core';
import * as M from '../../../node_modules/materialize-css/dist/js//materialize.min';
import { node} from "../services/interfaces";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  notes:Array<node>;
  window:Window
  constructor(private localAuthService:FireAuthService,private router:Router,private localAPIService:FireDatabaseService){
    this.window=window;
  }

  ngOnInit(){
  this.registerEventListners();
  this.loadNotes();
  }

  registerEventListners(){
    document.getElementById('new_note').addEventListener('click',this.newNote.bind(this));
    document.getElementById('note-refresh').addEventListener('click',this.refreshNotes.bind(this));
    
  }
  
  onCardClick(event){
    const node_id=event.currentTarget.id;
    let clickednote=this.notes.find(function(note){
      if (note.node_id===node_id){
        return note;
      }
    })
    const title= this.parseContent(clickednote.note.title);
    const content=this.parseContent(clickednote.note.content);
    this.localAPIService.nextDetailData(new DetailNote(title,content,node_id));
    this.router.navigate(["nav/newNote"]);
    
  }

  async refreshNotes(event:Event){
    try {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      this.notes= await this.requestForNotes();
    } catch (error) {
      this.showToast(error.message);
    }
  }

  async requestForNotes(){
    const uuid=this.localAuthService.uuid;
    return await this.localAPIService.getNotes(uuid);
  
  }

  
  async loadNotes(){
    try {
      this.notes=await this.requestForNotes();
    } catch (error) {
      this.showToast(error.message);
    }
  }

  newNote(){
    this.localAPIService.nextDetailData(new DetailNote("","",null))
    this.router.navigate(["nav/newNote"])
  }    

  parseContent(encodeContent){

    return JSON.parse(atob(encodeContent));
  }

  
  private showToast(message:string){
    return M.toast({html: message})
  }
  
}