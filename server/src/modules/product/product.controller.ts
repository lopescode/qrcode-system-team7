import { CreateProductDto } from '@/modules/product/dto/create-product.dto'
import { ProductService } from '@/modules/product/product.service'
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiQuery } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthGuard } from '../auth/auth.guard'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Res() response: Response,
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() createProductDto: CreateProductDto
  ) {
    const data = await this.productService.create({
      ...createProductDto,
      imageFile,
    })

    return response.status(HttpStatus.CREATED).json({
      timeStamp: new Date().toISOString(),
      path: '/product',
      result: Array(data).flat(),
    })
  }

  @Get()
  @ApiQuery({ name: 'categoryId', required: false })
  async findAll(@Res() response: Response, @Query('categoryId') categoryId?: number) {
    const data = await this.productService.findAll({
      where: {
        categoryId: categoryId ? Number(categoryId) : undefined,
      },
    })

    return response.status(HttpStatus.OK).json({
      timeStamp: new Date().toISOString(),
      path: '/product',
      result: Array(data).flat(),
    })
  }
}
