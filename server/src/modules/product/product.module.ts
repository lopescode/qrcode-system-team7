import { ExceptionModule } from '@/infra/exception/exception.module'
import { PrismaModule } from '@/infra/prisma/prisma.module'
import { ImageModule } from '@/modules/image/image.module'
import { ProductController } from '@/modules/product/product.controller'
import { ProductService } from '@/modules/product/product.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaModule, ImageModule, ExceptionModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
