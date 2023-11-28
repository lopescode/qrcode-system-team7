import { EncryptService } from '@/handlers/encrypt/encrypt.service'
import { ExceptionService } from '@/handlers/exception/exception.service'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Order, User } from '@prisma/client'
import { IAuth } from './domain/auth.interface'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService implements IAuth {
  private readonly issuer = 'sign-in'
  private readonly audience = 'users'

  constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptService: EncryptService,
    private readonly exceptionService: ExceptionService,
    private readonly jwtService: JwtService
  ) {}

  createToken(user: User, order: Order) {
    return {
      access_token: this.jwtService.sign(
        {
          id: user.id,
          order_id: order.id,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
          subject: user.id.toString(),
          issuer: this.issuer,
          audience: this.audience,
        }
      ),
    }
  }

  checkToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
      issuer: this.issuer,
      audience: this.audience,
    })
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token)
      return true
    } catch {
      return false
    }
  }

  async signIn(signInDto: SignInDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        cpf: signInDto.cpf,
        password: this.encryptService.sha256(signInDto.password),
      },
    })

    if (!userExists) {
      this.exceptionService.unauthorizedException({
        message: 'Usuário ou senha inválidos',
      })
    }

    const order =
      (await this.prismaService.order.findFirst({
        where: {
          userId: userExists.id,
          paymentStatus: 'PENDING',
        },
      })) ??
      (await this.prismaService.order.create({
        data: {
          paymentStatus: 'PENDING',
          price: '0.00',
          user: {
            connect: {
              id: userExists.id,
            },
          },
        },
      }))

    return this.createToken(userExists, order)
  }

  async signUp(signUpDto: SignUpDto) {
    const userAlreadyExists = await this.prismaService.user.findFirst({
      where: {
        cpf: signUpDto.cpf,
      },
    })

    if (userAlreadyExists) {
      this.exceptionService.conflictException({
        message: 'Usuário já cadastrado',
      })
    }

    const phoneNumberAlreadyRegistered = await this.prismaService.userPhone.findFirst({
      where: {
        phoneNumber: signUpDto.phoneNumber,
      },
    })

    if (phoneNumberAlreadyRegistered) {
      this.exceptionService.conflictException({
        message: 'Telefone já cadastrado',
      })
    }

    const user = await this.prismaService.user.create({
      data: {
        cpf: signUpDto.cpf,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        password: this.encryptService.sha256(signUpDto.password),
      },
    })

    await this.prismaService.userAddress.create({
      data: {
        city: signUpDto.city,
        complement: signUpDto.complement,
        country: signUpDto.country,
        neighborhood: signUpDto.neighborhood,
        postalCode: signUpDto.postalCode,
        state: signUpDto.state,
        streetAddress: signUpDto.streetAddress,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    await this.prismaService.userPhone.create({
      data: {
        areaCode: signUpDto.areaCode,
        countryCode: signUpDto.countryCode,
        phoneNumber: signUpDto.phoneNumber,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    const order = await this.prismaService.order.create({
      data: {
        paymentStatus: 'PENDING',
        price: '0.00',
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    return this.createToken(user, order)
  }
}
