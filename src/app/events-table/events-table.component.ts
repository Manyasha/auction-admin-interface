import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Event, STATES} from '../events/event.model';
import {EventsService} from '../events/events.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit {

  data;
  filterQuery = '';
  rowsOnPage = 10;
  sortBy = 'name';
  sortOrder = 'asc';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.eventsService.getEvents()
      .then(data => this.data = data)
      .catch(err => console.log(err));
  }

  markAsCurrent(event: Event) {
    event.startedAt = new Date();
    event.state = STATES.current;
    this.eventsService.updateEvent(event)
      .catch(err => console.log(err));
    this.eventsService.setCurrentEvent(event.id)
      .then(() => this.toasterService.pop('success', 'Success', 'Event marked as current'))
      .catch(err => this.toasterService.pop('error', 'Error', `code: ${err.status}, message: ${err.json().message}`));
  }

  startEvent(event: Event) {
    this.eventsService.getCurrentEvent()
      .then(curEvent => {
        if ( !curEvent ) {
          return;
        }
        this.toasterService.pop('warning', 'Warning', `The Event "${curEvent.title}" marked as current. Please, finish it.`);
      })
      .catch(err => {
        if ( err.status !== 404 ) {
          this.toasterService.pop('error', 'Error', `code: ${err.status}, message: ${err.json().message}`);
          return;
        }
        this.markAsCurrent(event);
      });
  }

  finishEvent(event: Event) {
    if ( event.state !== STATES.current ) {
      this.toasterService.pop('warning', 'Warning', 'It is impossible to finish this Event because it is not current');
      return;
    }
    event.finishedAt = new Date();
    event.state = STATES.finished;
    this.eventsService.updateEvent(event)
      .catch(err => console.log(err));
    this.eventsService.finishCurrentEvent()
      .then(() => this.toasterService.pop('success', 'Success', 'Event marked as finished'))
      .catch(err => this.toasterService.pop('error', 'Error', `code: ${err.status}, message: ${err.json().message}`));
  }

  modify(id: string): void {
    this.router.navigate(['update', id], {relativeTo: this.route});
  }
}
