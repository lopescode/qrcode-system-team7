import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createOrderItemDto: CreateOrderItemDto) {
    return await this.prisma.orderItem.create({
      data: {
        product: {
          connect: {
            id: createOrderItemDto.productId
          },
        },
        order: {
          connect: {
            id: createOrderItemDto.orderId
          },
        },
        orderStatus: {
          connect: {
            id: createOrderItemDto.orderStatusId
          },
        },
      },
    });
  }

  async findAll(orderId: number) {
    return await this.prisma.orderItem.findMany({
      where: {
        orderId: orderId,
      },
      include: {
        product: true,
        orderStatus: true,
        order: true,
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.orderItem.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  async remove(id: number) {
    return await this.prisma.orderItem.delete({
      where: {
        id: id,
      },
    });
  }
}
