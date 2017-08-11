import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-events-navbar',
  template: `
  <ul class="nav nav-pills">
    <li class="navigation-item">
      <a (click)="this.location.back()" title="Back">
        <i class="glyphicon glyphicon-arrow-left"></i>
        <span>Back</span>
      </a>
    </li>
    <li class="navigation-item">
      <a [routerLink]="['/events/create']" title="New Event">
        <i class="glyphicon glyphicon-plus"></i>
        <span>New Event</span>
      </a>
    </li>
  </ul>
  `,
  styleUrls: ['./navigation.component.css']
})
export class EventsNavBarComponent {
  constructor(private location: Location) {}
}
