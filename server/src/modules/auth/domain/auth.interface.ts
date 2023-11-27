import { SignInDto } from '@/modules/auth/dto/sign-in.dto'
import { User } from '@prisma/client'

type TCreateTokenResponse = {
  access_token: string
  id: number
  cpf: string
}

export interface IAuth {
  createToken(user: User): TCreateTokenResponse
  checkToken(token: string): any
  isValidToken(token: string): boolean
  signIn(signInDto: SignInDto): Promise<TCreateTokenResponse>
  signUp(signUpDto: any): Promise<TCreateTokenResponse>
}
