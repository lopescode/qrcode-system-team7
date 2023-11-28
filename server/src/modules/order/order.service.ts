import { ExceptionService } from '@/handlers/exception/exception.service'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Order, PaymentStatus } from '@prisma/client'
import { IOrder } from './domain/order.interface'
import { AddProductDto } from './dto/add-product.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { RemoveProductDto } from './dto/remove-product.dto'

@Injectable()
export class OrderService implements IOrder {
  constructor(private readonly prismaService: PrismaService, private readonly exceptionService: ExceptionService) {}

  async addProduct(params: { where: { id: number }; data: AddProductDto }): Promise<Order> {
    const orderExists = await this.prismaService.order.findUnique({
      where: {
        id: params.where.id,
      },
    })

    if (!orderExists) {
      this.exceptionService.notFoundException({
        message: 'Pedido não encontrado',
      })
    }

    const productExists = await this.prismaService.product.findUnique({
      where: {
        id: params.data.productId,
      },
    })

    if (!productExists) {
      this.exceptionService.notFoundException({
        message: 'Produto não encontrado',
      })
    }

    return await this.prismaService.order.update({
      where: {
        id: orderExists.id,
      },
      data: {
        products: {
          connectOrCreate: {
            create: {
              quantity: params.data.quantity,
              product: {
                connect: {
                  id: productExists.id,
                },
              },
            },
            where: {
              productId_orderId: {
                productId: productExists.id,
                orderId: orderExists.id,
              },
            },
          },
        },
      },
    })
  }

  async removeProduct(params: { where: { id: number }; data: RemoveProductDto }): Promise<Order> {
    const orderExists = await this.prismaService.order.findUnique({
      where: {
        id: params.where.id,
      },
    })

    if (!orderExists) {
      this.exceptionService.notFoundException({
        message: 'Pedido não encontrado',
      })
    }

    const productExists = await this.prismaService.product.findUnique({
      where: {
        id: params.data.productId,
      },
    })

    if (!productExists) {
      this.exceptionService.notFoundException({
        message: 'Produto não encontrado',
      })
    }

    return await this.prismaService.order.update({
      where: {
        id: params.where.id,
      },
      data: {
        products: {
          delete: {
            quantity: params.data.quantity,
            productId_orderId: {
              productId: params.data.productId,
              orderId: params.where.id,
            },
          },
        },
      },
    })
  }

  async pay(id: number): Promise<Order> {
    const orderExists = await this.prismaService.order.findUnique({
      where: {
        id,
      },
    })

    if (!orderExists) {
      this.exceptionService.notFoundException({
        message: 'Pedido não encontrado',
      })
    }

    return await this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    })
  }

  async findOne(params: { where: { id: number } }): Promise<Order> {
    const orderExits = await this.prismaService.order.findUnique({
      where: {
        id: params.where.id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!orderExits) {
      this.exceptionService.notFoundException({
        message: 'Pedido não encontrado',
      })
    }

    return orderExits
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
}
