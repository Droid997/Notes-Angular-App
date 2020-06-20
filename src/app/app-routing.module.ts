import { NavComponent } from './nav/nav.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component'
import {AuthGuard} from './guards/auth.guard'
import { NewNoteComponent } from './new-note/new-note.component';

const routes: Routes = [
  { path: '', component: AppComponent,canActivate:[AuthGuard] },
  { path: 'nav', component: NavComponent,
  children:[
    {path:'list',component:ListComponent},
    {path:'newNote',component:NewNoteComponent}
  ]
},
  { path: 'list', component: ListComponent},
  { path: 'register', component: RegisterComponent },
  {path:'login',component:LoginComponent},
  {path:'newNote',component:NewNoteComponent},
  { path: '**', redirectTo:"" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
