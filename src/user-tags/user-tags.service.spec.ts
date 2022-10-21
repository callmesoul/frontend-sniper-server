import { Test, TestingModule } from '@nestjs/testing';
import { UserTagsService } from './user-tags.service';

describe('UserTagsService', () => {
  let service: UserTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTagsService],
    }).compile();

    service = module.get<UserTagsService>(UserTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
