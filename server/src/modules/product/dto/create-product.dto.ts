import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  price: string

  imageFile: Express.Multer.File

  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @IsArray({
    context: {
      IsArray: 'IngredientIds must be an array of numbers',
      IsNumber: 'IngredientIds must be an array of numbers',
    },
  })
  @ArrayMinSize(1)
  ingredientIds: number[]
}
