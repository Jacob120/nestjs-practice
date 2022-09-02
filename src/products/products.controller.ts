import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { dateToArray } from '../shared/helper/date.helper';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDTO } from './dto/external-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  getProductById(@Param('id') _id_: string): ExternalProductDTO {
    return this.mapProductToExternal(
      this.productRepository.getProductById(_id_),
    );
  }

  @Get() getAllProducts(): Array<ExternalProductDTO> {
    return this.productRepository
      .getAllProducts()
      .map(this.mapProductToExternal);
  }

  @Post()
  addProduct(@Body() _item_: CreateProductDTO): ExternalProductDTO {
    return this.productRepository.addProduct(_item_);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDTO,
  ): ExternalProductDTO {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(id, dto),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') _id_: string): void {
    return this.productRepository.deleteProduct(_id_);
  }

  mapProductToExternal(product: Product): ExternalProductDTO {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }
}
