import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Event} from './event.model';
import {Product} from '../products/product.model';
import {EventsService} from './events.service';
import {ProductsService} from '../products/products.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})
export class EventFormComponent implements OnInit {

  title: string;
  event: Event;
  eventForm: FormGroup;
  isCreateMod: boolean;
  availableProducts: any[] = [];
  products: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private productService: ProductsService,
    private toasterService: ToasterService
  ) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { event: [Event, Array<Product>] }) => {
          this.event = data.event ? data.event[0] : new Event();
          this.products = data.event ? this.decorateProducts(data.event[1]) : [];
          this.isCreateMod = /create/.test(this.router.url);
          this.title = this.isCreateMod ? 'Create Event' : 'Update Event';
        },
        err => console.log(err)
      );
    this.getAvailableProducts();
    this.eventForm = this.createForm();
  }

  createForm() {
    return new FormGroup({
      title: new FormControl(this.event.title, [Validators.required, Validators.maxLength(255)]),
      state: new FormControl({value: this.event.state, disabled: true}),
      startedAt: new FormControl({value: this.event.startedAt, disabled: true}),
      finishedAt: new FormControl({value: this.event.finishedAt, disabled: true}),
      products: new FormControl(this.products)
    });
  }

  decorateProducts(products: any): any {
    if ( !products ) {
      return [];
    }
    products.forEach(product => {
      product.display = product.sku;
      product.value = product.title;
    });
    return products;
  }

  getAvailableProducts() {
    this.productService.getProductsByFilter('[where][archived]=false')
      .then(products => products.forEach(product => {
        if ( !product.sku || !product.title ) {
          return;
        }
        this.availableProducts.push(product);
      }))
      .catch(err => console.log(err));
  }

  matching (value: string, target: any): boolean {
    if ( !target ) {
      return false;
    }
    const targetSkuValue = target.sku;
    const targetTitleValue = target.title;
    const targetValue = targetSkuValue && targetTitleValue;

    return targetValue &&
      ( targetSkuValue.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
        targetTitleValue.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }

  onProductAdded(item: any) {
    this.event.productIds.push(item.id);
  }

  onProductRemoved(item: any) {
    const index = this.event.productIds.indexOf(item.id);
    this.event.productIds.splice(index, 1);
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.eventForm.markAsPristine();
    delete value.products;
    Object.assign(this.event, value);
    console.log(this.event, valid );
    if ( this.isCreateMod ) {
      this.eventsService.createEvent(this.event)
        .then(() => this.toasterService.pop('success', 'Success', 'Event created'));
      return;
    }
    this.eventsService.updateEvent(this.event)
      .then(() => this.toasterService.pop('success', 'Success', 'Event updated'));
  }

  clearForm() {
    this.event = new Event();
    this.products = [];
    this.eventForm = this.createForm();
  }
}
