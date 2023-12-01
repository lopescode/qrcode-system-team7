import { ExceptionService } from '@/handlers/exception/exception.service'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { User, UserAddress, UserPhone } from '@prisma/client'
import { IUser } from './domain/user.interface'

type UserResponse = Partial<User> & { phones: UserPhone[]; addresses: UserAddress[] }

@Injectable()
export class UserService implements IUser {
  constructor(private readonly prismaService: PrismaService, private readonly exceptionService: ExceptionService) {}

  async findOne(id: string): Promise<UserResponse> {
    const userExists = await this.prismaService.user.findUnique({
      where: { id: Number(id) },
      include: {
        addresses: true,
        phones: true,
      },
    })

    if (!userExists) {
      this.exceptionService.notFoundException({
        message: 'Usuário não encontrado',
      })
    }

    return {
      id: userExists.id,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      phones: userExists.phones,
      addresses: userExists.addresses,
    }
  }
}
