import { ExceptionModule } from '@/handlers/exception/exception.module'
import { ImageModule } from '@/handlers/image/image.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [PrismaModule, ImageModule, ExceptionModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
