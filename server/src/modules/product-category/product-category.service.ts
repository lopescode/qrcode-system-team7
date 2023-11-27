import { PrismaService } from '@/infra/prisma/prisma.service'
import { ImageService } from '@/modules/image/image.service'
import { IProductCategory } from '@/modules/product-category/domain/product-category.interface'
import { CreateProductCategoryDto } from '@/modules/product-category/dto/create-product-category.dto'
import { Injectable } from '@nestjs/common'
import { ProductCategory } from '@prisma/client'

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
        products: !!params.include.products,
      },
    })
  }
}
