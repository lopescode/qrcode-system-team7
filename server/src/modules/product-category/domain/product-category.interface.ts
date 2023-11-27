import { CreateProductCategoryDto } from '@/modules/product-category/dto/create-product-category.dto'
import { ProductCategory } from '@prisma/client'

export interface IProductCategory {
  create(data: CreateProductCategoryDto): Promise<ProductCategory>
  findAll(params: { include: { products: boolean } }): Promise<ProductCategory[]>
}
