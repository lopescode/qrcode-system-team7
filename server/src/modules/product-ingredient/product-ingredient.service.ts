import { Injectable } from '@nestjs/common'
import { ProductIngredient } from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateProductIngredientDto } from './dto/create-product-ingredient.dto'

@Injectable()
export class ProductIngredientService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductIngredientDto: CreateProductIngredientDto): Promise<ProductIngredient> {
    return this.prisma.productIngredient.create({
      data: createProductIngredientDto,
    })
  }

  findAll(): Promise<ProductIngredient[]> {
    return this.prisma.productIngredient.findMany()
  }

  findOne(id: number): Promise<ProductIngredient | null> {
    return this.prisma.productIngredient.findUnique({
      where: {
        id,
      },
    })
  }
}
