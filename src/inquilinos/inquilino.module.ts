import { Module } from '@nestjs/common';
import { InquilinoService } from './inquilino.service';
import { InquilinoController } from './inquilino.controller';
import { SupabaseModule } from '../config/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [InquilinoController],
  providers: [InquilinoService],
  exports: [InquilinoService],
})
export class InquilinoModule {}