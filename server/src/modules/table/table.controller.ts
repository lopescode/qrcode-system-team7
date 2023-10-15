import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateTableDto } from './dto/create-table.dto'
import { TableService } from './table.service'

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto)
  }

  @Get()
  findAll() {
    return this.tableService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id)
  }
}
