import { IsNotEmpty, IsNumber } from 'class-validator'

export class AddProductOnOrderDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number
}
