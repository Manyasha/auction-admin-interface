import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Product} from './product.model';
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class ProductsService {
  constructor(@Inject(Http) private http: Http,  private toasterService: ToasterService) {
  }

  errorException(error) {
    if ( error.code === 11000 || error.code === 11001 ){
      return Promise.reject(error);
    }
    console.log(error);
    this.toasterService.pop('error', 'Error', `code: ${error.statusCode}, message: ${error.code || error.message}`);
    return Promise.reject(error);
  }

  getProducts(): Promise<Product[]> {
    return this.http.get('/api/products')
      .toPromise()
      .then(response => response.json() as Product[])
      .then((products: Product[]) => Promise.resolve(products))
      .catch(err => Promise.reject(err));
  }
  getProductsByFilter(filterQuery: string): Promise<Product[]> {
    return this.http.get(`/api/products?filter${filterQuery}`)
      .toPromise()
      .then(response => response.json() as Product[])
      .then((products: Product[]) => Promise.resolve(products))
      .catch(err => Promise.reject(err));
  }
  getProduct(sku: string): Promise<Product> {
    return this.http.get(`/api/products/findOne?filter[where][sku]=${sku}`)
      .toPromise()
      .then(response => response.json() as Product)
      .then((product: Product) => Promise.resolve(product))
      .catch(err => this.errorException(err.json().error));
  }
  updateProduct(product: Product): Promise<any> {
    return this.http.post(`/api/products/${product.id}/replace`, product)
      .toPromise()
      .then(data => {
        console.log(data);
        return Promise.resolve(data);
      })
      .catch(err => this.errorException(err.json().error));
  }
  createProduct(product: Product): Promise<any> {
    return this.http.post('/api/products', product)
      .toPromise()
      .then(data => {
        console.log(data);
        return Promise.resolve(data);
      })
      .catch(err => this.errorException(err.json().error));
  }
}
