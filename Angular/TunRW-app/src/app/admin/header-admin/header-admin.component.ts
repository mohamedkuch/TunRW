import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) {
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
    console.log(this.router.url);

  }
}
