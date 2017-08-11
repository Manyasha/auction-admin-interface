import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ProductsTableComponent} from './products-table.component';
import {DataTableModule} from 'angular2-datatable';
import {ProductsTableFilterPipe} from './products-table-filter.pipe';
import {ProductFormComponent} from '../product-form/product-form.component';
import {ProductsRoutingModule} from '../products/products-routing.module';
import {ProductsListComponent} from '../products/products-list.component';
import {ProductsService} from '../products/products.service';
import {ProductsNavBarComponent} from '../navigation/products-navbar.component';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsTableComponent,
    ProductsTableFilterPipe,
    ProductFormComponent,
    ProductsListComponent,
    ProductsNavBarComponent
  ],
  exports : [ProductsTableComponent],
  providers: [ ProductsService ]
})
export class ProductsTableModule {}
