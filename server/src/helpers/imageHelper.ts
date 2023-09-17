import * as fs from 'fs';
import * as path from 'path';

export class ImageHelper {
  static async uploadImage(image: Express.Multer.File, filePath: string): Promise<string> {
    const uploadPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'app',
      'public',
      'uploads',
      filePath,
      image.originalname,
    );

    return new Promise((resolve, reject) => {
      fs.writeFile(uploadPath, image.buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(`/uploads/${filePath}/${image.originalname}`);
        }
      });
    });
  }
}
