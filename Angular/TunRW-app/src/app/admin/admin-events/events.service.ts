import { Event } from './events.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EventService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();

  getEvent() {
    return [...this.events];
  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }
  addEvent(title: string, date: string, adress: string, description: string) {
    const event: Event = {
             title: title,
              date: date,
            adress: adress,
       description: description
    };
    this.events.push(event);
    this.eventsUpdated.next([...this.events]);
  }
}
