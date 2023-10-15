import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ProductIngredient } from '@prisma/client'
import { CreateProductIngredientDto } from './dto/create-product-ingredient.dto'
import { ProductIngredientService } from './product-ingredient.service'

@Controller('product-ingredient')
export class ProductIngredientController {
  constructor(private readonly productIngredientService: ProductIngredientService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createProductIngredientDto: CreateProductIngredientDto): Promise<ProductIngredient> {
    return this.productIngredientService.create(createProductIngredientDto)
  }

  @Get()
  findAll(): Promise<ProductIngredient[]> {
    return this.productIngredientService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductIngredient | null> {
    return this.productIngredientService.findOne(+id)
  }
}
