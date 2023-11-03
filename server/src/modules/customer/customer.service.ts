import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { SignInCustomerDto } from './dto/sign-in-customer.dto'
import { SignUpCustomerDto } from './dto/sign-up-customer.dto'

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp({
    areaCode,
    city,
    complement,
    country,
    cpf,
    countryCode,
    firstName,
    lastName,
    neighborhood,
    password,
    phoneNumber,
    postalCode,
    state,
    streetAddress,
  }: SignUpCustomerDto) {
    const customerAlreadyExists = await this.prisma.customer.findFirst({
      where: {
        OR: [{ cpf }, { phones: { some: { phoneNumber } } }],
      },
    })

    if (customerAlreadyExists) throw new BadRequestException('Customer already registered')

    const customer = await this.prisma.customer.create({
      data: {
        cpf,
        firstName,
        lastName,
        password,
      },
    })

    await this.prisma.customerPhone.create({
      data: {
        areaCode,
        countryCode,
        phoneNumber,
        isMain: true,
        customer: {
          connect: {
            id: customer.id,
          },
        },
      },
    })

    await this.prisma.customerAddress.create({
      data: {
        city,
        complement,
        country,
        neighborhood,
        postalCode,
        state,
        streetAddress,
        isMain: true,
        customer: {
          connect: {
            id: customer.id,
          },
        },
      },
    })

    return {
      id: customer.id,
    }
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    })

    if (!customer) throw new BadRequestException('Customer not found')

    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
    }
  }

  async signIn({ cpf, password }: SignInCustomerDto) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        cpf,
      },
    })

    if (!customer) throw new BadRequestException('Customer not found')
    if (customer.password !== password) throw new BadRequestException('CPF or password incorrect')

    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
    }
  }
}
