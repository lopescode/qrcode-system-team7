import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CustomerModule } from './modules/customer/customer.module'
import { OrderModule } from './modules/order/order.module'
import { ProductCategoryModule } from './modules/product-category/product-category.module'
import { ProductIngredientModule } from './modules/product-ingredient/product-ingredient.module'
import { ProductModule } from './modules/product/product.module'
import { TableModule } from './modules/table/table.module'

@Module({
  imports: [ProductModule, OrderModule, CustomerModule, TableModule, ProductIngredientModule, ProductCategoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
