import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateTableDto {
  @IsNumber()
  @IsNotEmpty()
  number: number
}
