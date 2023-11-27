import { CreateOrderDto } from '@/modules/order/dto/create-order.dto'
import { UpdateOrderDto } from '@/modules/order/dto/update-order.dto'
import { OrderService } from '@/modules/order/order.service'
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { PaymentStatus } from '@prisma/client'
import { Response } from 'express'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Res() response: Response, @Body() createOrderDto: CreateOrderDto) {
    const data = await this.orderService.create(createOrderDto)

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      timeStamp: new Date().toISOString(),
      path: '/order',
      result: Array(data).flat(),
    })
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Res() response: Response, @Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const data = await this.orderService.update({
      where: { id: Number(id) },
      data: updateOrderDto,
    })

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      timeStamp: new Date().toISOString(),
      path: `/order/${id}`,
      result: Array(data).flat(),
    })
  }

  @Get()
  async findAll(
    @Res() response: Response,
    @Query('userId') userId: number,
    @Query('paymentStatus') paymentStatus: PaymentStatus,
    @Query('limit') limit: number,
    @Query('includeProduct') includeProduct: boolean
  ) {
    const data = await this.orderService.findAll({
      where: {
        userId: userId ? Number(userId) : 0,
        paymentStatus: paymentStatus ? paymentStatus : 'PENDING',
      },
      include: {
        products: !!includeProduct,
      },
      limit: limit ? Number(limit) : 10,
    })

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      timeStamp: new Date().toISOString(),
      path: '/order',
      result: Array(data).flat(),
    })
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    const data = await this.orderService.findOne({
      where: { id: Number(id) },
    })

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      timeStamp: new Date().toISOString(),
      path: `/order/${id}`,
      result: Array(data).flat(),
    })
  }
}
