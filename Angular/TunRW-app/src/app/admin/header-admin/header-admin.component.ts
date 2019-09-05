import { Component , OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Member } from '../admin-members/member.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotificationService } from './notifications.service';
import { Subscription } from 'rxjs';
import { Notification } from './notifications.modal';

@Component ({
  selector : 'app-header-admin',
  templateUrl : './header-admin.component.html',
  styleUrls : ['./header-admin.component.scss'],
  animations : [
    trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0}),
            animate('350ms', style({opacity:1}))
        ]),
        transition(':leave', [
          style({ opacity: 1}),
          animate('350ms', style({opacity:0}))
      ])
    ])
  ]
})

export class HeaderAdminComponent implements OnInit {
  @ViewChild("navBar", {static:false}) navBarElement: ElementRef;
  showNotification = false;
  currentUrl: string;
  currentUser: Member;
  notificationList: Notification[]= [];
  notificationSub: Subscription;
  totalNotification : Number;
  notWatchedNotification : Number;
  notWatchedNotificationSub : Subscription;


  isLoading : Boolean;
  eventCreateFlag = false;
  eventEditFlag = false;
  eventFlag = false;

  projectFlag = false; 
  projectCreateFlag = false;
  projectEditFlag = false;

  partnersFlag = false;
  partnersCreateFlag = false;
  partnersEditFlag = false;

  servicesFlag = false;
  servicesCreateFlag = false;
  servicesEditFlag = false;

  homeFlag = false;

  membersFlag = false;
  membersCreateFlag = false;

  aboutFlag = false;
  aboutCreateFlag = false;
  aboutEditFlag = false;

  userIsAuthenticated = false;

  bigNavbarFlag = true;
  smallNavbarFlag = false;

  constructor(private router: Router,
              private authService: AuthService ,
              private notificationService: NotificationService) {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
    if (this.currentUrl.includes('/admin/Events/edit')) {
      this.eventEditFlag = true;
    }
    if (this.currentUrl.includes('/admin/Projects/edit')) {
      this.projectEditFlag = true;
    }
    if (this.currentUrl.includes('/admin/Partners/edit')) {
      this.partnersEditFlag = true;
    }
    if (this.currentUrl.includes('/admin/Services/edit')) {
      this.servicesEditFlag = true;
    }
    if (this.currentUrl.includes('/admin/About/edit')) {
      this.aboutEditFlag = true;
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
      case '/admin/Services': {
        this.servicesFlag = true;
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
      case '/admin/About': {
        this.aboutFlag = true;
        break;
      }
      case '/admin/Members/create':{
        this.membersCreateFlag = true;
        break;
      }
      case '/admin/Services/create': {
        this.servicesCreateFlag  = true;
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
      case '/admin/Partners/create': {
          this.partnersCreateFlag  = true;
          break;
      }
      case '/admin/About/create': {
        this.aboutCreateFlag  = true;
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
    this.isLoading = true;
    // get notifications
    this.notificationService.getNotification(5, 1);
    this.notificationSub = this.notificationService.getNotificationUpdateListener()
      .subscribe(
        (data:{ notifications : Notification[] ,postCount : number, notWatchedPost: number} ) => {
          this.isLoading = false;
          this.totalNotification = data.postCount;
          this.notificationList = data.notifications;
          console.log("Notifications", this.notificationList);
        });
    // get not watched notifications
    this.notificationService.getNotWatchedNotification();
    this.notWatchedNotificationSub = this.notificationService.getNotWatchedNotificationUpdateListener()
        .subscribe((data) => {
          console.log("zzzz", data);
          this.notWatchedNotification = data.notWatchedPost;
    });
  }
  triggerNotification(){
    this.showNotification = !this.showNotification;
    if(this.showNotification && this.notWatchedNotification > 0){
      for(let i=0; i< this.notificationList.length; i++){
        let watchedArray = this.notificationList[i].watched;
          for(let j=0; j< watchedArray.length; j++){

            if(watchedArray[j]["_id"]== this.currentUser.id){
              console.log("updating", this.notificationList[i]);

              this.notificationService.updateNotification(this.notificationList[i].id);
              break;
            }
          }

      }
    }
  }
  watchVerification(notification){
    let watchedArray = notification.watched;

    for(let j=0; j < watchedArray.length; j++){
      if(this.currentUser.id == watchedArray[j]._id){
        return true;
      }
    }


    return false;
  }
  onLogout(){
    this.authService.logout();
    console.log('user Logged out !', this.authService.getAuthStatus());
  }


}
