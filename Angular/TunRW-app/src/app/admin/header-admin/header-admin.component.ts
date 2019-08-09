import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Member } from '../admin-members/member.model';
@Component ({
  selector : 'app-header-admin',
  templateUrl : './header-admin.component.html',
  styleUrls : ['./header-admin.component.css']
})

export class HeaderAdminComponent implements OnInit {
  currentUrl: string;
  currentUser: Member;

  eventCreateFlag = false;
  eventEditFlag = false;
  eventFlag = false;

  projectFlag = false; 
  projectCreateFlag = false;
  projectEditFlag = false;

  partnersFlag = false;
  partnersCreateFlag = false;
  partnersEditFlag = false;

  homeFlag = false;

  membersFlag = false;
  membersCreateFlag = false;

  userIsAuthenticated = false;

  constructor(private router: Router,
              private authService: AuthService ) {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
    if (this.currentUrl.includes('/admin/Events/edit')) {
      this.eventEditFlag = true;
    }
    if (this.currentUrl.includes('/admin/Projects/edit')) {
      this.projectEditFlag = true;
    }
    switch(this.currentUrl) {
      case '/admin': {
        this.homeFlag = true;
        break;
      }
      case '/admin/Events': {
        this.eventFlag = true;
        break;
      }
      case '/admin/Projects': {
        this.projectFlag = true;
        break;
      }
      case '/admin/Partners': {
        this.partnersFlag = true;
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
      case '/admin/Projects/create': {
        this.projectCreateFlag  = true;
        break;
     }
      default: {
         break;
      }
    }
   }
  ngOnInit() {
    this.authService.autoAuthUser();
    this.currentUser = this.authService.getcurrentUser();
    console.log('user', this.currentUser);
    console.log('user', this.authService.getTokenExpirationDate());
  }
  onLogout(){
    this.authService.logout();
    console.log('user Logged out !', this.authService.getAuthStatus());
  }
}
