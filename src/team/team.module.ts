import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './shemas/team.schema';
import { TeamController } from './team.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }])],
  providers: [TeamService],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamModule {}
