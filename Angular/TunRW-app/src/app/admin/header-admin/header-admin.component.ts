import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component ({
  selector : 'app-header-admin',
  templateUrl : './header-admin.component.html',
  styleUrls : ['./header-admin.component.css']
})

export class HeaderAdminComponent implements OnInit {
  currentUrl: string;
  eventCreateFlag = false;
  eventEditFlag = false;
  eventFlag = false;
  homeFlag = false;
  membersFlag = false;
  membersCreateFlag = false;
  userIsAuthenticated = false;

  constructor(private router: Router,
              private authService: AuthService ) {
    this.currentUrl = this.router.url;
    switch(this.currentUrl) {
      case '/admin': {
        this.homeFlag = true;
        break;
      }
      case '/admin/Events': {
        this.eventFlag = true;
        break;
      }
      case '/admin/Members': {
        this.membersFlag = true;
        break;
      }
      case '/admin/Members/create':{
        this.membersCreateFlag = true;
        break;
      }
      case '/admin/Events/create': {
         this.eventCreateFlag = true;
         break;
      }
      case '/admin/Events/edit': {
        this.eventEditFlag = true;
        break;
     }
      default: {
         break;
      }
    }
   }
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getAuthStatus();
    console.log('user Connected', this.authService.getAuthStatus() );
    console.log('Token is', this.authService.getToken() );
    console.log('Token Expires In ', this.authService.getTokenExpirationDate() );
  }
  onLogout(){
    this.authService.logout();
    console.log('user Logged out !', this.authService.getAuthStatus());
  }
}
