import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-products-navbar',
  template: `
  <ul class="nav nav-pills">
    <li class="navigation-item">
      <a (click)="this.location.back()" title="Back">
        <i class="glyphicon glyphicon-arrow-left"></i>
        <span>Back</span>
      </a>
    </li>
    <li class="navigation-item">
      <a [routerLink]="['/products/create']" title="New Product">
        <i class="glyphicon glyphicon-plus"></i>
        <span>New Product</span>
      </a>
    </li>
  </ul>
  `,
  styleUrls: ['./navigation.component.css']
})
export class ProductsNavBarComponent {
  constructor(private location: Location) {}
}
