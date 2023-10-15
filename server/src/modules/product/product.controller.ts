import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { type Product } from '@prisma/client'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() imageFile: Express.Multer.File, @Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create({
      ...createProductDto,
      imageFile,
    })
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productService.findOne(+id)
  }
}
