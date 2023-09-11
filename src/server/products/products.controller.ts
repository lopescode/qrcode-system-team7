import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { type Product } from '@prisma/client'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ImageHelper } from '../../shared/helpers/imageHelper'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() createProductDto: CreateProductDto
  ): Promise<Product> {
    const imagePath = await ImageHelper.uploadImage(imageFile)
    return await this.productsService.create(createProductDto, imagePath)
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return await this.productsService.findOne(+id)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return await this.productsService.remove(+id)
  }
}
