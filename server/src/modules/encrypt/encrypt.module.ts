import { EncryptService } from '@/modules/encrypt/encrypt.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [EncryptService],
  exports: [EncryptService],
})
export class EncryptModule {}
