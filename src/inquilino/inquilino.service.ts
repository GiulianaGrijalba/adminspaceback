import { Injectable } from '@nestjs/common';
import { CreateInquilinoDto } from './dto/create-inquilino.dto';
import { UpdateInquilinoDto } from './dto/update-inquilino.dto';

@Injectable()
export class InquilinoService {
  create(createInquilinoDto: CreateInquilinoDto) {
    return 'This action adds a new inquilino';
  }

  findAll() {
    return `This action returns all inquilino`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inquilino`;
  }

  update(id: number, updateInquilinoDto: UpdateInquilinoDto) {
    return `This action updates a #${id} inquilino`;
  }

  remove(id: number) {
    return `This action removes a #${id} inquilino`;
  }
}
