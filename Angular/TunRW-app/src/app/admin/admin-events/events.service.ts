import { Event } from './events.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class EventService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<{events: Event[] , postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}
  // get All Event
  getEvent(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, events: any, maxPosts: number}>('http://localhost:3000/api/events' + queryParams)
      .pipe(map((data) => {
          return {
            events : data.events.map(post => {
              return {
                id : post._id,
                title : post.title,
                date : post.date,
                adress : post.adress,
                description : post.description,
                imagePath: post.imagePath
              };
            }) ,
            maxPosts : data.maxPosts
        };
      }))
      .subscribe((finalData) => {
            this.events = finalData.events;
            this.eventsUpdated.next({events: [...this.events] , postCount : finalData.maxPosts});
      });
  }

  // get one Event
  getSingleEvent(id: string){
    return this.http.get<{_id: string, title: string,
      date: string, adress: string, description: string, imagePath: string}>('http://localhost:3000/api/events/' + id);
  }

  // Add New Event
  addEvent(title: string, date: string, adress: string, description: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('date', date);
    postData.append('adress', adress);
    postData.append('description', description);
    postData.append('image', image, title);
    this.http.post<{message: string, event: Event}>('http://localhost:3000/api/events', postData)
    .subscribe((data) => {
      this.router.navigate(['/admin/Events']);
    });

  }

  // update Event
  updateEvent(id: string ,title: string, date: string, adress: string, description: string, image: File | string) {
    let postData: Event | FormData;
    if(typeof(image) === 'object') {
       postData = new FormData();
      postData.append("title", title);
      postData.append("id", id);
      postData.append("date", date);
      postData.append("adress", adress);
      postData.append("description", description);
      postData.append("image", image, title);

    } else {
       postData = {
            id : id,
            title: title,
              date: date,
            adress: adress,
        description: description,
        imagePath: image
      }
    }
    this.http.put('http://localhost:3000/api/events/' + id, postData)
    .subscribe((data) => {
       const updatedEvents = [...this.events];
       const oldEventIndex = updatedEvents.findIndex(p => p.id === id);
       this.router.navigate(['/admin/Events']);
      });
  }

  // delete Event
  deleteEvent(eventId: string) {
    return this.http.delete("http://localhost:3000/api/events/" + eventId);
  }

  // Event Update Listener (listen on every change)
  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

}
