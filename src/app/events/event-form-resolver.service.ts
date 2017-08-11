import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';

import {Event} from './event.model';
import {EventsService} from './events.service';
import {Product} from '../products/product.model';

@Injectable()
export class EventFormResolver implements Resolve<any> {
  constructor(private eventService: EventsService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Promise<[Event, Array<Product>]> {
    const id = route.params['id'];
    return this.eventService.getEventByFilter(id, '[include]=products')
      .then(event => {
        const products = event.products.filter(product => product.sku && product.title);
        delete event.products;
        return Promise.resolve([event, products]);
      })
      .catch(() => {
        this.router.navigate(['/events']);
      });
  }
}
