import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {AngularFireDatabase} from'@angular/fire/database'
import {response,node,NotesResponse} from './interfaces'
import { BehaviorSubject } from 'rxjs';

export class DetailNote {
  constructor(public title:string,public content:string,public note_id:string) {}
}

@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {
  
  private _detailNote=new BehaviorSubject<DetailNote>(new DetailNote("","",""));
  public detailnote=this._detailNote.asObservable();
  private rootRef:firebase.database.Reference;
  public Notes:Array<node>;

  nextDetailData(data:DetailNote){
    this._detailNote.next(data);
  }
  get baseURL(){
    return "https://us-central1-notes-a06e0.cloudfunctions.net/app/api";
    // return "http://localhost:5000/notes-a06e0/us-central1/app/api";
  }

  constructor(private httpClient:HttpClient,private afDatabase:AngularFireDatabase) {
    this.rootRef =this.afDatabase.database.ref('users');

   }


  async initializeUserNode(uuid:string,email:string){
    const obj = {
        "user": email,
        "uuid": uuid,
        "notes": []
    }

        const snapshot = await this.rootRef.once('value');
        if (snapshot.child(uuid.toString()).exists()) {
            throw new Error('User already exists');
        } else {
            var newuserRef = this.rootRef.child(uuid);
            obj["uuid"] = newuserRef.key;
            await newuserRef.update(obj);
            return "User Created Successfully";
        }

    
  } 

  save(uuid:string,title:string,content:string,note_id?:string){
    const url=this.baseURL+"/save";
    title=JSON.stringify(title);
    content=JSON.stringify(content);
    title=btoa(unescape(encodeURIComponent(title)));
    content=btoa(unescape(encodeURIComponent(content)));
    return this.httpClient.post(url,{"uuid":uuid,"title":title,"content":content,"note_id":note_id}).toPromise()
  }

  async getNotes(uuid:string){
    const url=this.baseURL+`/notes?uuid=${uuid}`;
    const res=<NotesResponse>await this.httpClient.get(url).toPromise()
    this.Notes =res.message;
    return Promise.resolve(this.Notes);
  }
}
