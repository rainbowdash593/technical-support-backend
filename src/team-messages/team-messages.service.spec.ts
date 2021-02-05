import { Test, TestingModule } from '@nestjs/testing';
import { TeamMessagesService } from './team-messages.service';

describe('TeamMessagesService', () => {
  let service: TeamMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamMessagesService],
    }).compile();

    service = module.get<TeamMessagesService>(TeamMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
