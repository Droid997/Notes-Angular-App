import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FireAuthService} from '../services/fire-auth.service';
import * as M from '../../../node_modules/materialize-css/dist/js//materialize.min';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  private formGroup={
    username:['',Validators.required],
    email:['',Validators.email],
    password:['',Validators.required],
    confirmpassword:['',Validators.required]
  };
  constructor(private formBuilder:FormBuilder,
              private afAuth:FireAuthService,
              private router:Router) { 
    this.registerForm=this.formBuilder.group(this.formGroup)
  }

  ngOnInit(): void {
  }


  async onSubmit(){
    const username=this.registerForm.value.username;
    const email=this.registerForm.value.email;
    const password =this.registerForm.value.password;
    try {
      let response=await this.afAuth.register(username,email,password);
      await response.user.sendEmailVerification();
      this.router.navigate(['login'])
      
    } catch (error) {
      console.error(error);
      this.showToast(error.message);
    }
  }

  private showToast(message:string){
    return M.toast({html: message})
  }

}
