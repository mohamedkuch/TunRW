import { Event } from './events.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class EventService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient, private router: Router) {}
  // get All Event
  getEvent() {
    this.http.get<{message: string, events: any}>('http://localhost:3000/api/events')
      .pipe(map((data) => {
          return data.events.map(post => {
            return {
              id : post._id,
              title : post.title,
              date : post.date,
              adress : post.adress,
              description : post.description
            };

          });
      }))
      .subscribe((finalData) => {
            this.events = finalData;
            this.eventsUpdated.next([...this.events]);
      });
  }

  // get one Event
  getSingleEvent(id: string){
    return this.http.get<{_id: string, title: string,
      date: string, adress: string, description: string}>('http://localhost:3000/api/events/' + id);
  }

  // Add New Event
  addEvent(title: string, date: string, adress: string, description: string) {
    const event: Event = {
               id : null,
             title: title,
              date: date,
            adress: adress,
       description: description
    };
    this.http.post<{message: string, eventId: string}>('http://localhost:3000/api/events', event)
    .subscribe((data) => {
      const id = data.eventId;
      event.id = id;
      this.events.push(event);
      this.eventsUpdated.next([...this.events]);
      this.router.navigate(['/admin/Events']);
    });

  }

  // update Event
  updateEvent(id: string ,title: string, date: string, adress: string, description: string) {
    const event: Event = {
               id : id,
             title: title,
              date: date,
            adress: adress,
       description: description
    };
    this.http.put('http://localhost:3000/api/events/' + id, event)
    .subscribe((data) => {
       const updatedEvents = [...this.events];
       const oldEventIndex = updatedEvents.findIndex(p => p.id === event.id);
       updatedEvents[oldEventIndex] = event;
       this.events = updatedEvents;
       this.eventsUpdated.next([...this.events]);
       this.router.navigate(['/admin/Events']);
      });
  }

  // delete Event
  deleteEvent(eventId: string) {
    this.http.delete("http://localhost:3000/api/events/" + eventId)
      .subscribe(() =>{
        const updatedEvents = this.events.filter( event => event.id !== eventId );
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }

  // Event Update Listener (listen on every change)
  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

}
