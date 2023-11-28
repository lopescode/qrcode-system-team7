import { Module, forwardRef } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { OrderModule } from './modules/order/order.module'
import { ProductCategoryModule } from './modules/product-category/product-category.module'
import { ProductModule } from './modules/product/product.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [ProductModule, OrderModule, forwardRef(() => UserModule), ProductCategoryModule, AuthModule],
})
export class AppModule {}
