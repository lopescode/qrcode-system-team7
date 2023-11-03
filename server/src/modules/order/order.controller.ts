import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { Order, PaymentStatus } from '@prisma/client'
import { AddProductOnOrderDto } from './dto/add-product-on-order.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto)
  }

  @Post(':id/add-product')
  @UsePipes(ValidationPipe)
  async addProduct(@Param('id') id: string, @Body() addProductOnOrderDto: AddProductOnOrderDto): Promise<Order> {
    return this.orderService.addProduct(+id, addProductOnOrderDto)
  }

  @Post(':id/remove-product')
  @UsePipes(ValidationPipe)
  async removeProduct(@Param('id') id: string, @Body() addProductOnOrderDto: AddProductOnOrderDto): Promise<Order> {
    return this.orderService.removeProduct(+id, addProductOnOrderDto)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderService.update(+id, updateOrderDto)
  }

  @Get()
  async findAll(
    @Query('customerId') customerId: number,
    @Query('paymentStatus') paymentStatus: PaymentStatus
  ): Promise<Order[]> {
    return this.orderService.findAll(customerId, paymentStatus)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order | null> {
    return this.orderService.findOne(+id)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Order> {
    return this.orderService.remove(+id)
  }
}
