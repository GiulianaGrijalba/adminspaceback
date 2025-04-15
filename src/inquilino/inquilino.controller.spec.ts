import { Test, TestingModule } from '@nestjs/testing';
import { InquilinoController } from './inquilino.controller';
import { InquilinoService } from './inquilino.service';

describe('InquilinoController', () => {
  let controller: InquilinoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InquilinoController],
      providers: [InquilinoService],
    }).compile();

    controller = module.get<InquilinoController>(InquilinoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
