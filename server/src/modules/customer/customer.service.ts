import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { LoginCustomerDto } from './dto/login-customer.dto'

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
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
  }: CreateCustomerDto) {
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
        customerId: customer.id,
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
        customerId: customer.id,
        isMain: true,
      },
    })

    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
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

  async login(loginCustomerDto: LoginCustomerDto) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        cpf: loginCustomerDto.cpf,
      },
    })

    if (!customer) throw new BadRequestException('Customer not found')

    if (customer.password !== loginCustomerDto.password) throw new BadRequestException('CPF or password incorrect')

    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
    }
  }
}
