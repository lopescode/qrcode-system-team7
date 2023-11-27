import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(11)
  cpf: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}
