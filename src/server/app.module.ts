import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ProductsModule } from './products/products.module'

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
