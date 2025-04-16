import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InquilinoService } from './inquilino.service';
import { CreateInquilinoDto } from './dto/create-inquilino.dto';
import { UpdateInquilinoDto } from './dto/update-inquilino.dto';

@Controller('inquilino')
export class InquilinoController {
  constructor(private readonly inquilinoService: InquilinoService) {}

  @Post()
  create(@Body() createInquilinoDto: CreateInquilinoDto) {
    return this.inquilinoService.create(createInquilinoDto);
  }

  @Get()
  findAll() {
    return this.inquilinoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inquilinoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInquilinoDto: UpdateInquilinoDto) {
    return this.inquilinoService.update(+id, updateInquilinoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inquilinoService.remove(+id);
  }
}
