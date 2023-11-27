import { ExceptionModule } from '@/infra/exception/exception.module'
import { PrismaModule } from '@/infra/prisma/prisma.module'
import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { EncryptModule } from '@/modules/encrypt/encrypt.module'
import { UserModule } from '@/modules/user/user.module'
import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

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
