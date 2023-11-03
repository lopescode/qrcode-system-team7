import { IsNotEmpty, IsString, Length } from 'class-validator'

export class SignInCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(11)
  cpf: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string
}
