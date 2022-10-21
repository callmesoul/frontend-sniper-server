import { Test, TestingModule } from '@nestjs/testing';
import { UserTagRecordsController } from './user-tag-records.controller';
import { UserTagRecordsService } from './user-tag-records.service';

describe('UserTagRecordsController', () => {
  let controller: UserTagRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTagRecordsController],
      providers: [UserTagRecordsService],
    }).compile();

    controller = module.get<UserTagRecordsController>(UserTagRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
