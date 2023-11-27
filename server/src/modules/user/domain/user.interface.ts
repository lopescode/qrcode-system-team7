import { User } from '@prisma/client'

export interface IUser {
  findOne(params: { where: { id: number } }): Promise<Partial<User>>
}
