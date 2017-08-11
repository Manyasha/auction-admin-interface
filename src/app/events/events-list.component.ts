import {Component} from '@angular/core';

@Component({
  selector: 'app-events-list',
  template: `
    <div class="container-fluid">
      <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2"> <!-- column -->
    
        <div class="page-header">
          <h1>
            <span> Events List</span> <br>
            <app-events-navbar></app-events-navbar>
          </h1>
        </div>
    
        <router-outlet></router-outlet>
    
      </div>
    </div>
  `
})
export class EventsListComponent {}
