import { User } from '@prisma/client'

export interface IUser {
  findOne(id: string): Promise<Partial<User>>
}
