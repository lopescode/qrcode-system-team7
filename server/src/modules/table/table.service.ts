import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateTableDto } from './dto/create-table.dto'

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTableDto: CreateTableDto) {
    return this.prisma.table.create({
      data: createTableDto,
    })
  }

  findAll() {
    return this.prisma.table.findMany()
  }

  findOne(id: number) {
    return this.prisma.table.findUnique({
      where: { id },
    })
  }
}
