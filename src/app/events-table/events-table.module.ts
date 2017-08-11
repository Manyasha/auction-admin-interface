import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {EventsTableComponent} from './events-table.component';
import {EventsTableFilterPipe} from './events-table-filter.pipe';
import {DataTableModule} from 'angular2-datatable';
import {EventsRoutingModule} from '../events/events-routing.module';
import {EventFormComponent} from '../events/event-form.component';
import {EventsListComponent} from '../events/events-list.component';
import {EventsNavBarComponent} from '../navigation/events-navbar.component';
import {EventsService} from '../events/events.service';
import {TagInputModule} from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TagInputModule,
    BrowserAnimationsModule,
    EventsRoutingModule
  ],
  declarations: [
    EventsTableComponent,
    EventsTableFilterPipe,
    EventFormComponent,
    EventsListComponent,
    EventsNavBarComponent
  ],
  exports : [EventsTableComponent],
  providers: [ EventsService ]
})
export class EventsTableModule {}

