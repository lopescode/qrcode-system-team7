import { IsNotEmpty, IsNumber } from "class-validator";

export class ItemOrderDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
