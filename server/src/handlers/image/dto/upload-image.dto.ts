import { IsNotEmpty, IsString } from 'class-validator'

export class UploadImageDto {
  @IsNotEmpty()
  image: Express.Multer.File

  @IsString()
  @IsNotEmpty()
  filePath: string
}
