import { CreateOrderDto } from '@/modules/order/dto/create-order.dto'
import { Order } from '@prisma/client'

export interface IOrder {
  findOne(params: { where: { id: number } }): Promise<Order>
  create({ userId }: CreateOrderDto): Promise<Order>
  pay(id: number): Promise<Order>
  addProduct(id: string, productId: string): Promise<Order>
  removeProduct(id: string, productId: string): Promise<Order>
}
