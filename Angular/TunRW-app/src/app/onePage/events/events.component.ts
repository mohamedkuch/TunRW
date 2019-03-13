import { Component, Input } from '@angular/core';

@Component({
  selector : 'app-events',
  templateUrl : './events.component.html',
  styleUrls : ['./events.component.css']
})
export class EventsComponent{
  events = [
    {title : 'Vollversammlung und Aufnahme neuer Mitglieder',
      date : '11 january 2018 ',
    adress : 'Pontstr. 41, 52062 Aachen',
    description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ' +
    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,'  +
    ' sed diam voluptua ...'} ,
    {title : 'Vollversammlung und Aufnahme neuer Mitglieder',
    date : '11 january 2018 ',
    adress : 'Pontstr. 41, 52062 Aachen',
    description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ' +
    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,'  +
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr' +
    'sed diam nonumy eirmod tempor invidunt ut labore...'},
    {title : 'Vollversammlung und Aufnahme neuer Mitglieder',
    date : '11 january 2018 ',
    adress : 'Pontstr. 41, 52062 Aachen',
    description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ' +
    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,'  +
    ' sed diam voluptua ...'} ,
    {title : 'Vollversammlung und Aufnahme neuer Mitglieder',
    date : '11 january 2018 ',
    adress : 'Pontstr. 41, 52062 Aachen',
    description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ' +
    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,'  +
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr '},
    {title : 'Vollversammlung und Aufnahme neuer Mitglieder',
    date : '11 january 2018 ',
    adress : 'Pontstr. 41, 52062 Aachen',
    description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ' +
    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,'  +
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr '}
  ];
}
