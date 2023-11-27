import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price: string

  @ApiProperty()
  imageFile: Express.Multer.File

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @ApiProperty()
  @IsArray({
    context: {
      IsArray: 'IngredientIds must be an array of numbers',
      IsNumber: 'IngredientIds must be an array of numbers',
    },
  })
  @ArrayMinSize(1)
  ingredientIds: number[]
}
