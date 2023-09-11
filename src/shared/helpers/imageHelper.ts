import * as fs from 'fs'
import * as path from 'path'

export class ImageHelper {
  static async uploadImage(image: Express.Multer.File): Promise<string> {
    const uniqueFilename = `${new Date().getTime()}-${image.originalname}`
    const uploadPath = path.join(__dirname, '..', '..', '..', '..', 'uploads', uniqueFilename)

    return new Promise((resolve, reject) => {
      fs.writeFile(uploadPath, image.buffer, error => {
        if (error) {
          reject(error)
        } else {
          resolve(`/uploads/${uniqueFilename}`)
        }
      })
    })
  }
}