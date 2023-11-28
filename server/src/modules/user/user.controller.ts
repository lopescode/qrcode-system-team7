import { UserService } from '@/modules/user/user.service'
import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard } from '../auth/auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    const data = await this.userService.findOne({
      where: { id: Number(id) },
    })

    return response.json({
      timeStamp: new Date().toISOString(),
      path: `/user/${id}`,
      result: Array(data).flat(),
    })
  }
}
