import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Product} from '../products/product.model';
import {ProductsService} from '../products/products.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  title: string;
  product: Product;
  productForm: FormGroup;
  isCreateMod: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { product: Product }) => {
          this.product = data.product || new Product();
          this.isCreateMod = /create/.test(this.router.url);
          this.title = this.isCreateMod ? 'Create Product' : 'Update Product';
        },
        err => console.log(err)
      );
    this.productForm = this.createForm();
  }

  createForm() {
    const priceRegex = /(0|[1-9]\d{0,4})(\.\d{2})?/;
    return new FormGroup({
      title: new FormControl(this.product.title, [Validators.required, Validators.maxLength(255)]),
      description: new FormControl(this.product.description),
      shortDescription: new FormControl(this.product.shortDescription),
      sku: new FormControl(this.product.sku, [Validators.required, Validators.maxLength(255)]),
      price: new FormControl(this.product.price, [Validators.pattern(priceRegex)]),
      archived: new FormControl(this.product.archived),
      images: new FormControl(this.product.images)
    });
  }

  changeArchived() {
    this.productForm.markAsDirty();
  }

  duplicateSkuExeption(err) {
    if ( err.code !== 11000 && err.code !== 11001 ) {
      return;
    }
    this.productForm.get('sku').setErrors({notUnique: true});
  }

  onSubmit({ value, valid }: { value: Product, valid: boolean }) {
    this.productForm.markAsPristine();
    Object.assign(this.product, value);
    console.log(this.product, valid );
    if ( this.isCreateMod ) {
      this.productsService.createProduct(this.product)
        .then(() => this.toasterService.pop('success', 'Success', 'Product created'))
        .catch(err => this.duplicateSkuExeption(err));
      return;
    }
    this.productsService.updateProduct(this.product)
      .then(() => this.toasterService.pop('success', 'Success', 'Product updated'))
      .catch(err => this.duplicateSkuExeption(err));
  }

  clearForm() {
    this.product = new Product();
    this.productForm = this.createForm();
  }
}
