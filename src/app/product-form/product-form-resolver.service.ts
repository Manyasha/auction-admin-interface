import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';

import {Product} from '../products/product.model';
import {ProductsService} from '../products/products.service';

@Injectable()
export class ProductFormResolver implements Resolve<Product> {
  constructor(private productService: ProductsService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Promise<Product> {
    const id = route.params['id'];
    return this.productService.getProduct(id)
      .catch(() => {
        this.router.navigate(['/products']);
      });
  }
}
