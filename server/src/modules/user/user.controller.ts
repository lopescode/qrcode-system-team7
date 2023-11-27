import { UserService } from '@/modules/user/user.service'
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    const data = await this.userService.findOne({
      where: { id: Number(id) },
    })

    return response.json({
      statusCode: HttpStatus.OK,
      timeStamp: new Date().toISOString(),
      path: `/user/${id}`,
      result: Array(data).flat(),
    })
  }
}
