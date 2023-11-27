import { ExceptionModule } from '@/infra/exception/exception.module'
import { ImageService } from '@/modules/image/image.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [ExceptionModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
