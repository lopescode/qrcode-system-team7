import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class AddProductDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productId: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number
}
