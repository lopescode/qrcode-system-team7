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
import { ProductCategory } from '@prisma/client'
import { CreateProductCategoryDto } from './dto/create-product-category.dto'
import { ProductCategoryService } from './product-category.service'

@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() createProductCategoryDto: CreateProductCategoryDto
  ): Promise<ProductCategory> {
    return this.productCategoryService.create({ ...createProductCategoryDto, imageFile })
  }

  @Get()
  findAll(): Promise<ProductCategory[]> {
    return this.productCategoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductCategory | null> {
    return this.productCategoryService.findOne(+id)
  }
}
