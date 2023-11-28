import { ExceptionModule } from '@/handlers/exception/exception.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [PrismaModule, ExceptionModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
