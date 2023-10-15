import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProductIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string
}
