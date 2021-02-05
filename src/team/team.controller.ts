import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ITeamDocument } from './interfaces/team.interface';

@ApiTags('team')
@ApiBearerAuth()
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/')
  async get(): Promise<ITeamDocument[]> {
    return this.teamService.get();
  }

  @Post('/create')
  async create(
    @Body(new ValidationPipe()) createTeamDto: CreateTeamDto,
  ): Promise<ITeamDocument> {
    return this.teamService.create(createTeamDto);
  }
}
