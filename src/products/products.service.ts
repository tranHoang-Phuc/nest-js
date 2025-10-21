import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number): string {
    const id = Math.floor(Math.random() * Date.now()).toString();
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);
    return id;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: string): Product {
    const [product] = this.findProduct(id);
    if (!product) {
      throw new NotFoundException();
    }
    return { ...product };
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }
    return [this.products[productIndex], productIndex];
  }

  updateProduct(
    id: string,
    productData: {
      title?: string | null;
      description?: string | null;
      price?: number | null;
    },
  ) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = {
      ...product,
      ...productData,
    };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  partialUpdate(
    id: string,
    productData: {
      title?: string | null;
      description?: string | null;
      price?: number | null;
    },
  ) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = {
      ...product,
      ...productData,
    };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  deleteProduct(id: string) {
    const [product, index] = this.findProduct(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    this.products.splice(index, 1);
  }
}
