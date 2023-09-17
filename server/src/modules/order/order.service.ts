import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ customerId }: CreateOrderDto) {
    return await this.prisma.order.create({
      data: {
        active: true,
        createdAt: new Date(),
        customer: {
          connect: {
            id: customerId,
          }
        }
      },
    });
  }

  async findAll() {
    return await this.prisma.order.findMany({
      include: {
        customer: true,
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.order.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    return await this.prisma.order.delete({
      where: {
        id,
      }});
  }
}
