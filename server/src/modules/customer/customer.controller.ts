import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { LoginCustomerDto } from './dto/login-customer.dto'

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id)
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginCustomerDto: LoginCustomerDto) {
    return this.customerService.login(loginCustomerDto)
  }
}
