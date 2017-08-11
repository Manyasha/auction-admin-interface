import {Component} from '@angular/core';

@Component({
  selector: 'app-products-list',
  template: `
    <div class="container-fluid">
      <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2"> <!-- column -->
    
        <div class="page-header">
          <h1>
            <span> Products List</span> <br>
            <app-products-navbar></app-products-navbar>
          </h1>
        </div>
    
        <router-outlet></router-outlet>
    
      </div>
    </div>
  `
})
export class ProductsListComponent {}
