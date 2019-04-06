import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../events.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Event } from '../events.model';

@Component ({
  selector : 'app-create-event',
  templateUrl : './create-event.component.html',
  styleUrls : ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {
  enteredEventTitle = '';
  enteredEventDate = '';
  enteredEventAddress = '';
  enteredEventDescription = '';
  enteredEventImage;
  mode = 'create';
  private eventId: string;
  event: Event;
  isLoading = false;
  constructor(public eventsService: EventService,
              public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('eventId')){
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.isLoading = true;
        this.eventsService.getSingleEvent(this.eventId).subscribe(postData =>{
          this.isLoading = false;
          this.event = {id: postData._id, description: postData.description
                        , date: postData.date , adress: postData.adress, title: postData.title}
        });
      } else {
        this.mode = 'create';
        this.eventId = null;
      }
    });
  }
  onSaveEvent(form: NgForm) {
    if (form.invalid) {
      alert('Error , Please Fill in all the Data');
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.eventsService.addEvent( form.value.enteredEventTitle,
        form.value.enteredEventDate,
        form.value.enteredEventAddress,
        form.value.enteredEventDescription);

    } else {
      this.eventsService.updateEvent(this.eventId, form.value.enteredEventTitle,
        form.value.enteredEventDate,
        form.value.enteredEventAddress,
        form.value.enteredEventDescription);
    }
    form.resetForm();
  }
}
