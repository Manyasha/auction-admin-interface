import { ProductImage } from './product-image.model';

export interface IProduct {
  title: string;
  sku: string;
  images?: ProductImage[];
  description?: string;
  shortDescription?: string;
  price: number;
  archived?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}

export class Product implements IProduct {
  title: string;
  sku: string;
  images: ProductImage[] = [];
  description = '';
  shortDescription = '';
  price = 0;
  archived = false;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  constructor(data?: IProduct) {
    Object.assign(this, data);
  }
}
