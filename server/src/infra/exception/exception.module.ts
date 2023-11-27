import { ExceptionService } from '@/infra/exception/exception.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [ExceptionService],
  exports: [ExceptionService],
})
export class ExceptionModule {}
