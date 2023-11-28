import { Module } from '@nestjs/common'
import { ExceptionModule } from '../exception/exception.module'
import { ImageService } from './image.service'

@Module({
  imports: [ExceptionModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
