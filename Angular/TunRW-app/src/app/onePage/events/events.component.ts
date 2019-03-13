import { Component , OnInit, OnDestroy} from '@angular/core';
import { Event } from '../../admin/admin-events/events.model';
import { EventService } from '../../admin/admin-events/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector : 'app-events',
  templateUrl : './events.component.html',
  styleUrls : ['./events.component.css']
})
export class EventsComponent implements OnInit , OnDestroy{
  events: Event[] = [];
  private eventsSub: Subscription;

  constructor(public eventsService: EventService) {}

  ngOnInit() {
    this.eventsService.getEvent();
    this.eventsSub = this.eventsService.getEventUpdateListener()
      .subscribe(
        (data: Event[]) =>  {
          this.events = data;
        });
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();

  }
}
