import { ExceptionModule } from '@/infra/exception/exception.module'
import { PrismaModule } from '@/infra/prisma/prisma.module'
import { UserController } from '@/modules/user/user.controller'
import { UserService } from '@/modules/user/user.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaModule, ExceptionModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
