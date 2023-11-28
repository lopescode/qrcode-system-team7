import { UploadImageDto } from '../dto/upload-image.dto'

export interface IImage {
  uploadImage({ image, filePath }: UploadImageDto): Promise<string>
}
