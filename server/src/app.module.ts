import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ProductModule } from './modules/product/product.module'
import { OrderModule } from './modules/order/order.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { CategoryModule } from './modules/category/category.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [ProductModule, OrderModule, IngredientModule, CategoryModule, CustomerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
