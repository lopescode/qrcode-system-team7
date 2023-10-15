import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  imageFile: Express.Multer.File
}
