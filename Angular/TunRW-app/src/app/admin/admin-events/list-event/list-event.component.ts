import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../events.model';
import { EventService } from '../events.service';
import { Subscription } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-admin-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class AdminListEventsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  private eventsSub: Subscription;

  constructor(public eventsService: EventService) {}


  ngOnInit() {
      this.eventsService.getEvent();
      this.eventsSub = this.eventsService.getEventUpdateListener()
        .subscribe(
          (events: Event[]) => {
            this.events = events;
          });
  }
  onDelete(eventId: string){
    this.eventsService.deleteEvent(eventId);
  }
  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }
}
