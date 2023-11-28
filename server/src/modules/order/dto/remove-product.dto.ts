import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class RemoveProductDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productId: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number
}
