import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { SignInCustomerDto } from './dto/sign-in-customer.dto'
import { SignUpCustomerDto } from './dto/sign-up-customer.dto'

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id)
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInCustomerDto: SignInCustomerDto) {
    return this.customerService.signIn(signInCustomerDto)
  }

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  async signUp(@Body() signUpCustomerDto: SignUpCustomerDto) {
    return this.customerService.signUp(signUpCustomerDto)
  }
}
