import { BadRequestException, Injectable } from '@nestjs/common'
import { Order, PaymentStatus } from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { AddProductOnOrderDto } from './dto/add-product-on-order.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ customerId, tableId }: CreateOrderDto): Promise<Order> {
    if (!customerId && !tableId) throw new BadRequestException('You must provide a customer or a table')
    if (customerId && tableId) throw new BadRequestException('You must provide only a customer or a table')

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
    }

    return await this.prisma.order.create({
      data: {
        paymentStatus: PaymentStatus.PENDING,
        price: '0',
        customerId,
        tableId,
      },
    })
  }

  async addProduct(id: number, { productId }: AddProductOnOrderDto): Promise<Order> {
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
      include: {
        products: true,
      },
    })

    if (!order) throw new BadRequestException('Order not found')

    const productAlreadyAdded = order.products.find(product => product.productId === productId)
    const productQuantity = productAlreadyAdded ? productAlreadyAdded.quantity + 1 : 1

    if (productAlreadyAdded) {
      await this.prisma.productsOnOrder.update({
        data: {
          quantity: productQuantity,
        },
        where: {
          productId_orderId: {
            orderId: id,
            productId,
          },
        },
      })
    }

    const price = String(Number(order.price) + Number(product.price))

    return await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        price,
        products: {
          connectOrCreate: {
            create: {
              quantity: productQuantity,
              productId,
            },
            where: {
              productId_orderId: {
                orderId: id,
                productId,
              },
            },
          },
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })
  }

  async update(id: number, { paymentStatus }: UpdateOrderDto): Promise<Order> {
    return await this.prisma.order.update({
      data: {
        paymentStatus,
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
