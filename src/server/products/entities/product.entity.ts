import { category } from '../../categories/entity/category.entity'
import { Ingredient } from '../../ingredients/entity/ingredient.entity'

export class Product {
  id: number
  name: string
  description?: string
  ingredients: Ingredient[]
  imageUrl: string
  category: category
  categoryId: number
}
