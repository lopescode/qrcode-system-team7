import { UploadImageDto } from '@/modules/image/dto/upload-image.dto'

export interface IImage {
  uploadImage({ image, filePath }: UploadImageDto): Promise<string>
}
