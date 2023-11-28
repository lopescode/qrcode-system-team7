import { EncryptModule } from '@/handlers/encrypt/encrypt.module'
import { ExceptionModule } from '@/handlers/exception/exception.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    EncryptModule,
    ExceptionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
