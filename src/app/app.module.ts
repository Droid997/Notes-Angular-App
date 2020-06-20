import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ReactiveFormsModule,FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { from } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {FireAuthService} from './services/fire-auth.service';
import { FireDatabaseService } from './services/fire-database.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { NavComponent } from './nav/nav.component';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RegisterComponent,
    LoginComponent,
    NewNoteComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireDatabaseModule
  ],
  providers: [FireAuthService,FireDatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
