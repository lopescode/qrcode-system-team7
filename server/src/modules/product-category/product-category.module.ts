import { PrismaModule } from '@/infra/prisma/prisma.module'
import { ImageModule } from '@/modules/image/image.module'
import { ProductCategoryController } from '@/modules/product-category/product-category.controller'
import { ProductCategoryService } from '@/modules/product-category/product-category.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaModule, ImageModule],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
