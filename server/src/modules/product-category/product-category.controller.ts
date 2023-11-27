import { CreateProductCategoryDto } from '@/modules/product-category/dto/create-product-category.dto'
import { ProductCategoryService } from '@/modules/product-category/product-category.service'
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'

@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Res() response: Response,
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() createProductCategoryDto: CreateProductCategoryDto
  ) {
    const data = await this.productCategoryService.create({ ...createProductCategoryDto, imageFile })

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      timestamp: new Date().toISOString(),
      path: '/product-category',
      result: Array(data).flat(),
    })
  }

  @Get()
  async findAll(@Res() response: Response, @Query('includeProducts') includeProducts: boolean) {
    console.log(includeProducts)
    const data = await this.productCategoryService.findAll({
      include: {
        products: includeProducts,
      },
    })

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
      path: '/product-category',
      result: Array(data).flat(),
    })
  }
}
