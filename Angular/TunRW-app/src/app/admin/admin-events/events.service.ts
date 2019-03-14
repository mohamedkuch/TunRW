import { Event } from './events.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class EventService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient) {}
  getEvent() {
    this.http.get<{message: string, events: Event[]}>('http://localhost:3000/api/events')
      .subscribe((data) => {
            this.events = data.events;
            this.eventsUpdated.next([...this.events]);
      });
  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }
  addEvent(title: string, date: string, adress: string, description: string) {
    const event: Event = {
               id : null,
             title: title,
              date: date,
            adress: adress,
       description: description
    };
    this.http.post<{message: string}>('http://localhost:3000/api/events', event)
    .subscribe((data) => {
      console.log(data.message);
      this.events.push(event);
      this.eventsUpdated.next([...this.events]);
    });

  }
}
