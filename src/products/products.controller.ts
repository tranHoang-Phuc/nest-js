import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getProducts(): Product[] {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const id = this.productService.insertProduct(title, description, price);
    return { id: id };
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() productData: Product) {
    const updatedProduct = this.productService.updateProduct(id, productData);
    return updatedProduct;
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() productData: Product) {
    const updatedProduct = this.productService.partialUpdate(id, productData);
    return updatedProduct;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productService.deleteProduct(id);
  }
}
