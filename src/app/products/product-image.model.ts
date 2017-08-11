export interface IProductImage {
  imageUrl: string;
  previewUrl?: string;
}

export class ProductImage implements IProductImage {
  imageUrl: string;
  previewUrl?: string;
  constructor(data?: IProductImage) {
    Object.assign(this, data);
  }
}
