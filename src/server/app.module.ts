import { Module } from '@nestjs/common'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { AppController } from './app.controller'
import { ProductsModule } from './products/products.module'

@Module({
  imports: [RenderModule.forRootAsync(Next({})), ProductsModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
