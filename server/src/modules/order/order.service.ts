import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ItemOrderDto } from './dto/item-order';

@Injectable()
export class OrderService {
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async addItem(itemOrderDto: ItemOrderDto) {
    return 'This action adds a new item to order';
  }
  
  async removeItem(itemOrderDto: ItemOrderDto) {
    return 'This action removes a item from order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
