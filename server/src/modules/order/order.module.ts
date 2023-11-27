import { ExceptionModule } from '@/infra/exception/exception.module'
import { PrismaModule } from '@/infra/prisma/prisma.module'
import { OrderController } from '@/modules/order/order.controller'
import { OrderService } from '@/modules/order/order.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaModule, ExceptionModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
