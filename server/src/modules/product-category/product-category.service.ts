import { Injectable } from '@nestjs/common'
import { ProductCategory } from '@prisma/client'
import { ImageHelper } from 'src/helpers/imageHelper'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateProductCategoryDto } from './dto/create-product-category.dto'

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ description, imageFile, name }: CreateProductCategoryDto): Promise<ProductCategory> {
    const imageUrl = await ImageHelper.uploadImage(imageFile, 'products')

    return this.prisma.productCategory.create({
      data: {
        name,
        description,
        imageUrl,
      },
    })
  }

  findAll(): Promise<ProductCategory[]> {
    return this.prisma.productCategory.findMany({
      include: {
        products: true,
      },
    })
  }

  findOne(id: number): Promise<ProductCategory | null> {
    return this.prisma.productCategory.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    })
  }
}
