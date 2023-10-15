import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/infra/prisma/prisma.module'
import { ProductIngredientController } from './product-ingredient.controller'
import { ProductIngredientService } from './product-ingredient.service'

@Module({
  imports: [PrismaModule],
  controllers: [ProductIngredientController],
  providers: [ProductIngredientService],
})
export class ProductIngredientModule {}
