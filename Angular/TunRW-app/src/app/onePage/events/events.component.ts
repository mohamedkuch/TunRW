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
  postsPerPage = 2;
  currentPage = 1;
  totalEvents = 0;

  constructor(public eventsService: EventService) {
    this.eventsService.getEvent(this.postsPerPage, this.currentPage);
    this.eventsSub = this.eventsService.getEventUpdateListener()
      .subscribe(
        (data:{events:  Event[], postCount : number}) =>  {
          this.events = data.events;
          this.totalEvents = data.postCount;
        });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();

  }
}
