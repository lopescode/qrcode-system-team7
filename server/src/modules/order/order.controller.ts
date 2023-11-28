import { AuthGuard } from '@/modules/auth/auth.guard'
import { CreateOrderDto } from '@/modules/order/dto/create-order.dto'
import { OrderService } from '@/modules/order/order.service'
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Response } from 'express'
import { AddProductDto } from './dto/add-product.dto'
import { RemoveProductDto } from './dto/remove-product.dto'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Res() response: Response, @Body() createOrderDto: CreateOrderDto) {
    const data = await this.orderService.create(createOrderDto)

    return response.status(HttpStatus.CREATED).json({
      timeStamp: new Date().toISOString(),
      path: '/order',
      result: Array(data).flat(),
    })
  }

  @UseGuards(AuthGuard)
  @Post(':id/pay')
  async pay(@Res() response: Response, @Param('id') id: string) {
    const data = await this.orderService.pay(Number(id))

    return response.status(HttpStatus.OK).json({
      timeStamp: new Date().toISOString(),
      path: `/order/${id}/pay`,
      result: Array(data).flat(),
    })
  }

  @UseGuards(AuthGuard)
  @Post(':id/add-product')
  async addProduct(@Res() response: Response, @Param('id') id: string, @Body() body: AddProductDto) {
    const data = await this.orderService.addProduct({
      where: { id: Number(id) },
      data: body,
    })

    return response.status(HttpStatus.OK).json({
      timeStamp: new Date().toISOString(),
      path: `/order/${id}/add-product`,
      result: Array(data).flat(),
    })
  }

  @UseGuards(AuthGuard)
  @Post(':id/remove-product')
  async removeProduct(@Res() response: Response, @Param('id') id: string, @Body() body: RemoveProductDto) {
    const data = await this.orderService.removeProduct({
      where: { id: Number(id) },
      data: body,
    })

    return response.status(HttpStatus.OK).json({
      timeStamp: new Date().toISOString(),
      path: `/order/${id}/remove-product`,
      result: Array(data).flat(),
    })
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    const data = await this.orderService.findOne({
      where: { id: Number(id) },
    })

    return response.status(HttpStatus.OK).json({
      timeStamp: new Date().toISOString(),
      path: `/order/${id}`,
      result: Array(data).flat(),
    })
  }
}
