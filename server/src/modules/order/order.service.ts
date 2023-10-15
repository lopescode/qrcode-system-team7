import { BadRequestException, Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ customerId, productId, tableId, quantity }: CreateOrderDto): Promise<Order> {
    if (!customerId && !tableId) throw new BadRequestException('You must provide a customer or a table')
    if (customerId && tableId) throw new BadRequestException('You must provide only a customer or a table')

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) throw new BadRequestException('Product not found')

    const price = (Number(product.price) * quantity).toFixed(2)

    let order: Order

    if (customerId) {
      const customer = await this.prisma.customer.findUnique({
        where: {
          id: customerId,
        },
      })

      if (!customer) throw new BadRequestException('Customer not found')

      const customerHasOrderUnpaid = await this.prisma.order.findFirst({
        where: {
          paymentStatus: {
            not: 'PAID',
          },
          customerId,
          tableId,
        },
      })

      if (customerHasOrderUnpaid) throw new BadRequestException('Customer already has an unpaid order')

      order = await this.prisma.order.create({
        data: {
          customer: {
            connect: {
              id: customerId,
            },
          },
          paymentStatus: 'PENDING',
          price,
        },
      })
    } else if (tableId) {
      const table = await this.prisma.table.findUnique({
        where: {
          id: tableId,
        },
      })

      if (!table) throw new BadRequestException('Table not found')

      const tableHasOrderUnpaid = await this.prisma.order.findFirst({
        where: {
          paymentStatus: {
            not: 'PAID',
          },
          tableId,
        },
      })

      if (tableHasOrderUnpaid) throw new BadRequestException('Table already has an unpaid order')

      order = await this.prisma.order.create({
        data: {
          table: {
            connect: {
              id: tableId,
            },
          },
          paymentStatus: 'PENDING',
          price,
        },
      })
    }

    await this.prisma.productsOnOrder.create({
      data: {
        order: {
          connect: {
            id: order.id,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
        quantity,
      },
    })

    return order
  }

  async update(id: number, { productId, quantity }: UpdateOrderDto): Promise<Order> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) throw new BadRequestException('Product not found')

    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    })

    if (!order) throw new BadRequestException('Order not found')

    const orderUpdated = await this.prisma.order.update({
      data: {
        products: {
          update: {
            where: {
              productId_orderId: {
                orderId: order.id,
                productId: product.id,
              },
            },
            data: {
              quantity,
            },
          },
        },
      },
      where: {
        id,
      },
    })

    const productsOnOrder = await this.prisma.productsOnOrder.findMany({
      where: {
        orderId: order.id,
      },
      include: {
        product: true,
      },
    })

    const totalPriceUpdated = productsOnOrder.reduce((_, productOnOrder) => {
      return Number(productOnOrder.product.price) * productOnOrder.quantity
    }, 0)

    return await this.prisma.order.update({
      data: {
        price: totalPriceUpdated.toFixed(2),
      },
      where: {
        id,
      },
    })
  }

  async findAll(): Promise<Order[]> {
    return await this.prisma.order.findMany({
      include: {
        customer: true,
        products: {
          include: {
            product: true,
          },
        },
        table: true,
      },
    })
  }

  async findOne(id: number): Promise<Order | null> {
    return await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        products: {
          include: {
            product: true,
          },
        },
        table: true,
      },
    })
  }

  async remove(id: number): Promise<Order> {
    return await this.prisma.order.delete({
      where: {
        id,
      },
    })
  }
}
