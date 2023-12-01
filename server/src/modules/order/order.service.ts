import { ExceptionService } from '@/handlers/exception/exception.service'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Order, PaymentStatus } from '@prisma/client'
import { IOrder } from './domain/order.interface'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrderService implements IOrder {
  constructor(private readonly prismaService: PrismaService, private readonly exceptionService: ExceptionService) {}

  async addProduct(id: string, productId: string): Promise<Order> {
    const orderExists = await this.prismaService.order.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!orderExists) {
      this.exceptionService.notFoundException({
        message: 'Pedido não encontrado',
      })
    }

    const productExists = await this.prismaService.product.findUnique({
      where: {
        id: Number(productId),
      },
    })

    if (!productExists) {
      this.exceptionService.notFoundException({
        message: 'Produto não encontrado',
      })
    }

    const productAlreadyRegistered = await this.prismaService.productsOnOrder.findFirst({
      where: {
        productId: Number(productId),
        orderId: Number(id),
      },
    })

    let order = null
    if (productAlreadyRegistered) {
      order = await this.prismaService.order.update({
        where: {
          id: Number(id),
        },
        data: {
          products: {
            update: {
              where: {
                productId_orderId: {
                  productId: productAlreadyRegistered.productId,
                  orderId: productAlreadyRegistered.orderId,
                },
              },
              data: {
                quantity: productAlreadyRegistered.quantity + 1,
              },
            },
          },
        },
      })
    } else {
      order = await this.prismaService.order.update({
        where: {
          id: Number(id),
        },
        data: {
          products: {
            create: {
              quantity: 1,
              product: {
                connect: {
                  id: Number(productId),
                },
              },
            },
          },
        },
      })
    }

    return await this.updatePrice(order.id)
  }

  async removeProduct(id: string, productId: string): Promise<Order> {
    const orderExists = await this.prismaService.order.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!orderExists) {
      this.exceptionService.notFoundException({
        message: 'Pedido não encontrado',
      })
    }

    const productExists = await this.prismaService.product.findUnique({
      where: {
        id: Number(productId),
      },
    })

    if (!productExists) {
      this.exceptionService.notFoundException({
        message: 'Produto não encontrado',
      })
    }

    const productAlreadyRegistered = await this.prismaService.productsOnOrder.findFirst({
      where: {
        productId: Number(productId),
        orderId: Number(id),
      },
    })

    if (!productAlreadyRegistered) {
      this.exceptionService.notFoundException({
        message: 'Produto não encontrado no pedido',
      })
    }

    const currentQuantity = productAlreadyRegistered.quantity

    let order = null

    if (currentQuantity <= 1) {
      order = await this.prismaService.order.update({
        where: {
          id: Number(id),
        },
        data: {
          products: {
            delete: {
              productId_orderId: {
                productId: productAlreadyRegistered.productId,
                orderId: productAlreadyRegistered.orderId,
              },
            },
          },
        },
        include: {
          products: true,
        },
      })
    } else {
      order = await this.prismaService.order.update({
        where: {
          id: Number(id),
        },
        data: {
          products: {
            update: {
              where: {
                productId_orderId: {
                  productId: productAlreadyRegistered.productId,
                  orderId: productAlreadyRegistered.orderId,
                },
              },
              data: {
                quantity: productAlreadyRegistered.quantity - 1,
              },
            },
          },
        },
        include: {
          products: true,
        },
      })
    }

    return await this.updatePrice(order.id)
  }

  async updatePrice(id: number): Promise<Order> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id,
      },
      include: {
        products: {
          select: {
            product: {
              select: {
                price: true,
              },
            },
            quantity: true,
          },
        },
      },
    })

    const products = order.products

    let price = 0

    products.forEach(product => {
      price += product.quantity * Number(product.product.price)
    })

    return await this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        price: String(price),
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
