import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../events.model';
import { EventService } from '../events.service';
import { Subscription } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-admin-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class AdminListEventsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  private eventsSub: Subscription;
  isLoading = false;
  totalEvents = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2 , 5, 10];
  constructor(public eventsService: EventService) {}


  ngOnInit() {
    this.isLoading = true;
      this.eventsService.getEvent(this.postsPerPage, this.currentPage);
      this.eventsSub = this.eventsService.getEventUpdateListener()
        .subscribe(
          (eventData:{ events : Event[] ,postCount : number } ) => {
            this.isLoading = false;
            this.totalEvents = eventData.postCount;
            this.events = eventData.events;
          });
  }
  onDelete(eventId: string) {
    this.isLoading = true;
    this.eventsService.deleteEvent(eventId).subscribe(() => {
      this.eventsService.getEvent(this.postsPerPage, this.currentPage);
    });
  }
  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }
  onChangePage( pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.eventsService.getEvent(this.postsPerPage, this.currentPage);
  }
}
