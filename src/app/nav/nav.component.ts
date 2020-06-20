import { Router,NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '../services/fire-auth.service';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user:string;
  email:String;
  isList:boolean;
  private sideNav;

  constructor(private router:Router,private authService:FireAuthService) { 
    this.router.events.subscribe(this.routeChange.bind(this));
  }

  ngOnInit(): void {
    this.registerDOMElements()
    this.registerEvenListners();
    this.email=this.authService.user_details.user.email;
    this.user=this.authService.user_details.user.displayName;
  }

  registerDOMElements(){
    this.sideNav = M.Sidenav.init(document.querySelector('.sidenav'));
    M.FloatingActionButton.init(document.querySelector('.fixed-action-btn'));
  }

  registerEvenListners(){
    document.getElementById('logout').addEventListener('click',this.log_out.bind(this));
  }

  routeChange(oRoute:Event){
    if (oRoute instanceof NavigationEnd){
      this.isList= oRoute.url==="/nav/list";
    }
  }

  log_out(){
    this.sideNav.close()
    this.authService.logout();
  }


}
