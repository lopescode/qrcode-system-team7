import { ExceptionService } from '@/handlers/exception/exception.service'
import { ImageService } from '@/handlers/image/image.service'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Product } from '@prisma/client'
import { IProduct } from './domain/product.interface'
import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductService implements IProduct {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imageService: ImageService,
    private readonly exceptionService: ExceptionService
  ) {}

  async create({ ingredientIds, description, categoryId, imageFile, price, name }: CreateProductDto): Promise<Product> {
    const productExists = await this.prismaService.product.findUnique({
      where: {
        name,
      },
    })

    if (productExists) {
      this.exceptionService.conflictException({
        message: 'Produto já cadastrado',
      })
    }

    const categoryExists = await this.prismaService.productCategory.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!categoryExists) {
      this.exceptionService.notFoundException({
        message: 'Categoria não encontrada',
      })
    }

    ingredientIds.map(async ingredientId => {
      const ingredient = await this.prismaService.productIngredient.findUnique({
        where: {
          id: ingredientId,
        },
      })

      if (!ingredient) {
        this.exceptionService.notFoundException({
          message: 'Ingrediente não encontrado',
        })
      }
    })

    const imageUrl = await this.imageService.uploadImage({ image: imageFile, filePath: 'products' })

    const productCreated = await this.prismaService.product.create({
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
      await this.prismaService.ingredientOnProduct.create({
        data: productIngredient,
      })
    })

    return productCreated
  }

  async findAll(params: { where: { categoryId: number | undefined } }): Promise<Product[]> {
    if (!params.where.categoryId) {
      return await this.prismaService.product.findMany()
    }

    return await this.prismaService.product.findMany({
      where: {
        categoryId: params.where.categoryId,
      },
      include: {
        ingredientOnProduct: {
          include: {
            ingredient: true,
          },
        },
      },
    })
  }
}
