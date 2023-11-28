import { ImageModule } from '@/handlers/image/image.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { ProductCategoryController } from './product-category.controller'
import { ProductCategoryService } from './product-category.service'

@Module({
  imports: [PrismaModule, ImageModule, UserModule],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
