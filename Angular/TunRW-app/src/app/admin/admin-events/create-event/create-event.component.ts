import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../events.service';

@Component ({
  selector : 'app-create-event',
  templateUrl : './create-event.component.html',
  styleUrls : ['./create-event.component.css']
})

export class CreateEventComponent {
  enteredEventTitle = '';
  enteredEventDate = '';
  enteredEventAddress = '';
  enteredEventDescription = '';
  enteredEventImage;



  constructor(public eventsService: EventService) {

  }
  onAddEvent(form: NgForm) {
    if (form.invalid) {
      alert('Error , Please Fill in all the Data');
      return;
    }
    this.eventsService.addEvent( form.value.enteredEventTitle,
                                 form.value.enteredEventDate,
                                 form.value.enteredEventAddress,
                                 form.value.enteredEventDescription);
    form.resetForm();
  }
}
