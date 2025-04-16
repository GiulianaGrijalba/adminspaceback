import { Test, TestingModule } from '@nestjs/testing';
import { InquilinoService } from './inquilino.service';

describe('InquilinoService', () => {
  let service: InquilinoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InquilinoService],
    }).compile();

    service = module.get<InquilinoService>(InquilinoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
