import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Notification } from './notifications.modal';

const BACKEND_URL = environment.apiUrl + "/notifications";
@Injectable({providedIn: 'root'})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationsUpdated = new Subject<{notifications: Notification[] , postCount: number, notWatchedPost:number}>();

  constructor(private http: HttpClient, private router: Router) {}
  // get All Notifications
  getNotification(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, notifications: any, maxPosts: number, notWatchedPost: number}>(BACKEND_URL + queryParams)
      .pipe(map((data) => {
          return {
            notifications : data.notifications.map(post => {
              return {
                id : post._id,
                text : post.text,
                watched : post.watched,
                section : post.section,
                creator: post.creator
              };
            }) ,
            maxPosts : data.maxPosts,
            notWatchedPost: data.notWatchedPost
        };
      }))
      .subscribe((finalData) => {
            this.notifications = finalData.notifications;
            this.notificationsUpdated.next({notifications: [...this.notifications] , postCount : finalData.maxPosts, notWatchedPost : finalData.notWatchedPost});
      });
  }



  // update Notification
  updateNotification(id: string) {
    this.http.put(BACKEND_URL + "/" +  id, id)
    .subscribe((data) => {
        console.log("notification updated", data);
       const updateNotification = [...this.notifications];
       const oldNotificationIndex = updateNotification.findIndex(p => p.id === id);
      });
  }

  // Notification Update Listener (listen on every change)
  getNotificationUpdateListener() {
    return this.notificationsUpdated.asObservable();
  }

}
