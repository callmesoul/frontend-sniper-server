import { Test, TestingModule } from '@nestjs/testing';
import { UserTagRecordsService } from './user-tag-records.service';

describe('UserTagRecordsService', () => {
  let service: UserTagRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTagRecordsService],
    }).compile();

    service = module.get<UserTagRecordsService>(UserTagRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
