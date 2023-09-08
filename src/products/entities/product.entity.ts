import { category } from 'src/categories/entity/category.entity'
import { Ingredient } from 'src/ingredients/entity/ingredient.entity'

export class Product {
  id: number
  name: string
  description?: string
  ingredients: Ingredient[]
  imageUrl: string
  category: category
  categoryId: number
}
