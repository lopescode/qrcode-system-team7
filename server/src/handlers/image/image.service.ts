import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { ExceptionService } from '../exception/exception.service'
import { IImage } from './domain/image.interface'
import { UploadImageDto } from './dto/upload-image.dto'

@Injectable()
export class ImageService implements IImage {
  constructor(private readonly exceptionService: ExceptionService) {}

  async uploadImage({ image, filePath }: UploadImageDto): Promise<string> {
    const uploadPath = path.join(__dirname, '..', '..', '..', 'app', 'public', 'uploads', filePath, image.originalname)

    return new Promise((resolve, reject) => {
      fs.writeFile(uploadPath, image.buffer, error => {
        if (error) {
          reject(
            this.exceptionService.internalServerErrorException({
              message: 'Erro ao salvar imagem',
            })
          )
        } else {
          resolve(`/uploads/${filePath}/${image.originalname}`)
        }
      })
    })
  }
}
