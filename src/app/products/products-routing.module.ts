import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProductsTableComponent} from '../products-table/products-table.component';
import {ProductFormComponent} from '../product-form/product-form.component';
import {ProductsListComponent} from './products-list.component';
import {ProductFormResolver} from '../product-form/product-form-resolver.service';

const productsRoutes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
    children: [
      {
        path: '',
        component: ProductsTableComponent
      },
      {
        path: 'create',
        component: ProductFormComponent
      },
      {
        path: 'update/:id',
        component: ProductFormComponent,
        resolve: {
          product: ProductFormResolver
        }
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProductFormResolver
  ]
})
export class ProductsRoutingModule { }
