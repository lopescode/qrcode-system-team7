import { IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number

  @IsNotEmpty()
  @IsNumber()
  quantity: number
}
