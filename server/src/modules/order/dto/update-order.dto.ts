import { ApiProperty } from '@nestjs/swagger'
import { PaymentStatus } from '@prisma/client'
import { IsOptional, IsString } from 'class-validator'

export class UpdateOrderDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  paymentStatus: PaymentStatus
}
