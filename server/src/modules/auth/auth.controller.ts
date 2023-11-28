import { AuthService } from '@/modules/auth/auth.service'
import { SignInDto } from '@/modules/auth/dto/sign-in.dto'
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto'
import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  async signIn(@Res() response: Response, @Body() signInDto: SignInDto) {
    const data = await this.authService.signIn(signInDto)

    return response.status(HttpStatus.OK).json({
      timestamp: new Date().toISOString(),
      path: '/auth/sign-in',
      result: Array(data).flat(),
    })
  }

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  async signUp(@Res() response: Response, @Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto)

    return response.status(HttpStatus.OK).json({
      timestamp: new Date().toISOString(),
      path: '/auth/sign-up',
      result: Array(data).flat(),
    })
  }
}
