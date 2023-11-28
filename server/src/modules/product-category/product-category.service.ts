import { ImageService } from '@/handlers/image/image.service'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { ProductCategory } from '@prisma/client'
import { IProductCategory } from './domain/product-category.interface'
import { CreateProductCategoryDto } from './dto/create-product-category.dto'

@Injectable()
export class ProductCategoryService implements IProductCategory {
  constructor(private readonly prismaService: PrismaService, private readonly imageService: ImageService) {}

  async create({ description, imageFile, name }: CreateProductCategoryDto): Promise<ProductCategory> {
    const imageUrl = await this.imageService.uploadImage({ image: imageFile, filePath: 'products' })

    return await this.prismaService.productCategory.create({
      data: {
        name,
        description,
        imageUrl,
      },
    })
  }

  async findAll(params: { include: { products: boolean } }): Promise<ProductCategory[]> {
    return await this.prismaService.productCategory.findMany({
      include: {
        products: {
          include: {
            ingredientOnProduct: {
              include: {
                ingredient: true,
              },
            },
          },
        },
      },
    })
  }
}
