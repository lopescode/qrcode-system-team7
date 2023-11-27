import { ExceptionService } from '@/infra/exception/exception.service'
import { IImage } from '@/modules/image/domain/image.interface'
import { UploadImageDto } from '@/modules/image/dto/upload-image.dto'
import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

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
