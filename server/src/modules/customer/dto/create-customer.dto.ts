import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  cpf: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  streetAddress: string

  @IsString()
  @IsOptional()
  complement: string

  @IsString()
  @IsNotEmpty()
  neighborhood: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  state: string

  @IsString()
  @IsNotEmpty()
  country: string

  @IsString()
  @IsNotEmpty()
  postalCode: string

  @IsString()
  @IsNotEmpty()
  countryCode: string

  @IsString()
  @IsNotEmpty()
  areaCode: string

  @IsString()
  @IsNotEmpty()
  phoneNumber: string
}
