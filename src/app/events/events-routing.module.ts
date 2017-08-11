import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {EventsTableComponent} from '../events-table/events-table.component';
import {EventFormComponent} from './event-form.component';
import {EventsListComponent} from './events-list.component';
import {EventFormResolver} from './event-form-resolver.service';

const eventsRoutes: Routes = [
  {
    path: 'events',
    component: EventsListComponent,
    children: [
      {
        path: '',
        component: EventsTableComponent
      },
      {
        path: 'create',
        component: EventFormComponent
      },
      {
        path: 'update/:id',
        component: EventFormComponent,
        resolve: {
          event: EventFormResolver
        }
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(eventsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    EventFormResolver
  ]
})
export class EventsRoutingModule { }
