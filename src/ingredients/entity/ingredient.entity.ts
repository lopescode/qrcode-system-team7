import { Product } from "src/products/entities/product.entity"

export class Ingredient {
    id: number
    name: string
    products: Product[]
}