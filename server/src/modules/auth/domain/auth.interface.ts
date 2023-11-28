import { SignInDto } from '@/modules/auth/dto/sign-in.dto'
import { Order, User } from '@prisma/client'

type TCreateTokenResponse = {
  access_token: string
}

export interface IAuth {
  createToken(user: User, order: Order): TCreateTokenResponse
  checkToken(token: string): any
  isValidToken(token: string): boolean
  signIn(signInDto: SignInDto): Promise<TCreateTokenResponse>
  signUp(signUpDto: any): Promise<TCreateTokenResponse>
}
