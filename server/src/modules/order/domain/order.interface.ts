import { CreateOrderDto } from '@/modules/order/dto/create-order.dto'
import { UpdateOrderDto } from '@/modules/order/dto/update-order.dto'
import { Order, PaymentStatus } from '@prisma/client'

export interface IOrder {
  findOne(params: { where: { id: number } }): Promise<Order>
  findAll(params: { where: { userId: number; paymentStatus: PaymentStatus } }): Promise<Order[]>
  create({ userId }: CreateOrderDto): Promise<Order>
  update(params: { where: { id: number }; data: UpdateOrderDto }): Promise<Order>
}
