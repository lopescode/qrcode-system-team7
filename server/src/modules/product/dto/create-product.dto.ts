import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty()
  categoryName: string

  @IsString()
  @IsNotEmpty()
  price: string

  @IsArray({
    context: {
      IsString,
    },
  })
  @ArrayMinSize(1)
  ingredientsName: string[]

  imageFile: Express.Multer.File
}
