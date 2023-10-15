import { PaymentStatus } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  paymentStatus: PaymentStatus
}
