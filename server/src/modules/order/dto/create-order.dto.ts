import { IsNumber, IsOptional } from 'class-validator'

export class CreateOrderDto {
  @IsNumber()
  @IsOptional()
  customerId: number

  @IsNumber()
  @IsOptional()
  tableId: number
}
