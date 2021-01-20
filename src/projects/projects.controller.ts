import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { IProjectDocument } from './interfaces/project.interface';
import { Roles } from '../users/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { CreateProjectDto } from './dto/create-project.dto';
import { IDeletedEntitiesResponse } from '../common/interfaces/deleted-entities-response.interface';
import { IUpdatedEntitiesResponse } from '../common/interfaces/updated-entities-response.interface';

@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get('/')
  async getList(): Promise<IProjectDocument[]> {
    return this.projectService.get();
  }

  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  async find(@Param() { id }): Promise<IProjectDocument> {
    return this.projectService.find(id);
  }

  @Post('/create')
  @Roles(Role.Admin)
  async create(
    @Body(new ValidationPipe()) createProjectDto: CreateProjectDto,
  ): Promise<IProjectDocument> {
    return this.projectService.create(createProjectDto);
  }

  @ApiParam({ name: 'id', type: String })
  @Post('/generate-token/:id')
  @Roles(Role.Admin)
  async generateToken(@Param() { id }): Promise<IUpdatedEntitiesResponse> {
    return this.projectService.updateToken(id);
  }

  @ApiParam({ name: 'id', type: String })
  @Post('/delete/:id')
  @Roles(Role.Admin)
  async delete(@Param() { id }): Promise<IDeletedEntitiesResponse> {
    return await this.projectService.remove(id);
  }
}
