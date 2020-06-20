import { FireDatabaseService } from './fire-database.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  note_Data:string;
  private user_details_key='userDetails'; 
  private user_registred='registred'
  constructor(private afAuth:AngularFireAuth, private router:Router,private fdService:FireDatabaseService) { }
  
  
  get user_details():firebase.auth.UserCredential{
    return JSON.parse(window.localStorage.getItem(this.user_details_key));
  }
  get uuid(){
    return this.user_details.user.uid;
  }

  get isRegisterd(){
    let val=window.localStorage.getItem(this.user_registred);
    return !!val;
  }

  setLoggedIn(userDetails){
    window.localStorage.setItem(this.user_details_key,JSON.stringify(userDetails));
    window.localStorage.setItem(this.user_registred,'true');
  }
  clearLoggedIn(){
    window.localStorage.removeItem(this.user_details_key);
    window.localStorage.removeItem(this.user_registred);
  }
  
  async register(display_name:string,user_email:string,password:string):Promise<firebase.auth.UserCredential>{

    return new Promise(async (resolve,reject)=>{
      try {
        let user_details=await this.afAuth.createUserWithEmailAndPassword(user_email,password);
        this.afAuth.user.subscribe(async (userCrendtials)=>{
          await userCrendtials.updateProfile({displayName:display_name});
          const uuid=user_details.user.uid;
          const email=user_details.user.email;
          this.fdService.initializeUserNode(uuid,email);
          resolve(user_details);
        })
      } catch (error) {
        reject(error.message); 
      }
    })
   
  

  }

  async signIn(email:string,password:string){
    return await this.afAuth.signInWithEmailAndPassword(email,password);

  }
  navigateToList(){
    if (!this.isRegisterd)
    this.router.navigate(['login'])
    else
    this.router.navigate(['nav/list'])
    return this.isRegisterd
  }


  logout(){
    
    this.clearLoggedIn();
    this.router.navigate(['login'])
  }
}
