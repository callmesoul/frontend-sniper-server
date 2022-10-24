import { Test, TestingModule } from '@nestjs/testing';
import { ErrorsService } from './errors.service';

describe('ErrorsService', () => {
  let service: ErrorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorsService],
    }).compile();

    service = module.get<ErrorsService>(ErrorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
