import { Router } from '@angular/router';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min';
import {FireAuthService} from '../services/fire-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm:FormGroup
  private formGroup={
    email:['',Validators.email],
    password:['',Validators.required]
  
  };
  constructor(private formBuilder:FormBuilder,
    private afAuth:FireAuthService,
    private router:Router
    ) {
    this.loginForm =this.formBuilder.group(this.formGroup);
   }

  ngOnInit(): void {
  }


  async onSubmit(){
    const email=this.loginForm.value.email;
    const password =this.loginForm.value.password;
    try {
      let response=await this.afAuth.signIn(email,password);
      if(response.user.emailVerified){
        this.afAuth.setLoggedIn(response);
        this.router.navigate(['/nav/list']);
      }else{
        throw new Error("You'r Email hasn't been verified yet");
      }
      
    } catch (error) {
      if(error.code==="auth/wrong-password")
      this.showToast("Check email or passowrd");
      else if(error.code==="auth/network-request-failed")
      this.showToast("Unable to connect to internet");
      else 
      this.showToast(error.message);
      console.error(error);
    }
  }

  private showToast(message:string){
    return M.toast({html: message})
  }

}
