import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {AppRoutingModule} from './app-routing.module';
import {EventsTableModule} from './events-table/events-table.module';
import {ProductsTableModule} from './products-table/products-table.module';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ModalComponent} from './shared/modal.component';
import {ToasterModule} from 'angular2-toaster';

@NgModule({
  declarations: [ AppComponent, DashboardComponent , ModalComponent  ],
  imports: [ BrowserModule, EventsTableModule, ProductsTableModule, ToasterModule, AppRoutingModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
