import { ExceptionModule } from '@/handlers/exception/exception.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [PrismaModule, ExceptionModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
