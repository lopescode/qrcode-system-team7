import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { type Product } from '@prisma/client'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor (private readonly productsService: ProductsService) {}

  @Post()
  async create (@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto)
  }

  @Get()
  async findAll (): Promise<Product[]> {
    return await this.productsService.findAll()
  }

  @Get(':id')
  async findOne (@Param('id') id: string): Promise<Product | null> {
    return await this.productsService.findOne(+id)
  }

  @Patch(':id')
  async update (@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  async remove (@Param('id') id: string): Promise<Product> {
    return await this.productsService.remove(+id)
  }
}
