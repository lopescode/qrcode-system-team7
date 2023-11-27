import { ExceptionService } from '@/infra/exception/exception.service'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { IOrder } from '@/modules/order/domain/order.interface'
import { CreateOrderDto } from '@/modules/order/dto/create-order.dto'
import { UpdateOrderDto } from '@/modules/order/dto/update-order.dto'
import { Injectable } from '@nestjs/common'
import { Order, PaymentStatus } from '@prisma/client'

@Injectable()
export class OrderService implements IOrder {
  constructor(private readonly prismaService: PrismaService, private readonly exceptionService: ExceptionService) {}

  async findOne(params: { where: { id: number } }): Promise<Order> {
    const orderExits = await this.prismaService.order.findUnique({
      where: {
        id: params.where.id,
      },
    })

    if (!orderExits) {
      this.exceptionService.notFoundException({
        message: 'Pedido não encontrado',
      })
    }

    return orderExits
  }

  async findAll(params: {
    where: { userId: number; paymentStatus: PaymentStatus }
    include: { products: boolean }
    limit: number
  }): Promise<Order[]> {
    return await this.prismaService.order.findMany({
      where: {
        userId: params.where.userId,
        paymentStatus: params.where.paymentStatus,
      },
      include: {
        products: params.include.products,
      },
      take: params.limit,
    })
  }

  async create({ userId }: CreateOrderDto): Promise<Order> {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!userExists) {
      this.exceptionService.notFoundException({
        message: 'Usuário não encontrado',
      })
    }

    const userHasOrderUnpaid = await this.prismaService.order.findFirst({
      where: {
        paymentStatus: {
          not: 'PAID',
        },
        userId,
      },
    })

    if (userHasOrderUnpaid) {
      this.exceptionService.unauthorizedException({
        message: 'Usuário já possui um pedido em aberto',
      })
    }

    return await this.prismaService.order.create({
      data: {
        paymentStatus: PaymentStatus.PENDING,
        price: '0',
        userId,
      },
    })
  }

  async update(params: { where: { id: number }; data: UpdateOrderDto }): Promise<Order> {
    const orderExists = await this.prismaService.order.findUnique({
      where: {
        id: params.where.id,
      },
    })

    if (!orderExists) {
      this.exceptionService.badRequestException({
        message: 'Pedido não encontrado',
      })
    }

    return await this.prismaService.order.update({
      where: {
        id: orderExists.id,
      },
      data: {
        ...params.data,
      },
    })
  }
}
