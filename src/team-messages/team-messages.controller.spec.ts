import { Test, TestingModule } from '@nestjs/testing';
import { TeamMessagesController } from './team-messages.controller';

describe('TeamMessagesController', () => {
  let controller: TeamMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMessagesController],
    }).compile();

    controller = module.get<TeamMessagesController>(TeamMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
