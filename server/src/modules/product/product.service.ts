import { BadRequestException, Injectable } from '@nestjs/common'
import { Product } from '@prisma/client'
import { ImageHelper } from 'src/helpers/imageHelper'
import { PrismaService } from '../../infra/prisma/prisma.service'
import { type CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ ingredientIds, description, categoryId, imageFile, price, name }: CreateProductDto): Promise<Product> {
    await this.validate({ ingredientIds, categoryId, name, description, price, imageFile })

    const imageUrl = await ImageHelper.uploadImage(imageFile, 'products')

    const productCreated = await this.prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        price,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    })

    const productIngredients = ingredientIds.map(ingredient => {
      return {
        ingredientId: ingredient,
        productId: productCreated.id,
      }
    })

    productIngredients.map(async productIngredient => {
      await this.prisma.ingredientsOnProduct.create({
        data: productIngredient,
      })
    })

    return productCreated
  }

  private async validate({ ingredientIds, categoryId, name }: CreateProductDto): Promise<void> {
    const productExists = await this.prisma.product.findUnique({
      where: {
        name,
      },
    })
    if (productExists) throw new BadRequestException('Product already exists')

    const category = await this.prisma.productCategory.findUnique({
      where: {
        id: categoryId,
      },
    })
    if (!category) throw new BadRequestException(`Category #${categoryId} not found`)

    ingredientIds.map(async ingredientId => {
      const ingredient = await this.prisma.productIngredient.findUnique({
        where: {
          id: ingredientId,
        },
      })

      if (!ingredient) throw new BadRequestException(`Ingredient #${ingredientId} not found`)
    })
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    })
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    })
  }
}
