import { ExceptionService } from '@/infra/exception/exception.service'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { IUser } from '@/modules/user/domain/user.interface'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

@Injectable()
export class UserService implements IUser {
  constructor(private readonly prismaService: PrismaService, private readonly exceptionService: ExceptionService) {}

  async findOne(params: { where: { id: number } }): Promise<Partial<User>> {
    const userExists = await this.prismaService.user.findUnique({
      where: { id: params.where.id },
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
    }
  }
}
