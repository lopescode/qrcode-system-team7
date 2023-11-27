import { CreateProductDto } from '@/modules/product/dto/create-product.dto'
import { Product } from '@prisma/client'

export interface IProduct {
  create({ ingredientIds, description, categoryId, imageFile, price, name }: CreateProductDto): Promise<Product>
  findAll(params: { where: { categoryId: number } }): Promise<Product[]>
}
