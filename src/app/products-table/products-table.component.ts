import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Product} from '../products/product.model';
import {ProductsService} from '../products/products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  data;
  filterQuery = '';
  rowsOnPage = 10;
  sortBy = 'name';
  sortOrder = 'asc';
  showForm = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts()
      .then(data => this.data = data);
  }

  modify(product: Product): void {
    this.router.navigate(['update', product.sku], {relativeTo: this.route});
  }
}
