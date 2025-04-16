import { Module } from '@nestjs/common';
import { InquilinoService } from './inquilino.service';
import { InquilinoController } from './inquilino.controller';

@Module({
  controllers: [InquilinoController],
  providers: [InquilinoService],
})
export class InquilinoModule {}
