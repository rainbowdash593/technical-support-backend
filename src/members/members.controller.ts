import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { IMemberDocument } from './interfaces/member.interface';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Roles } from '../users/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { IDeletedEntitiesResponse } from '../common/interfaces/deleted-entities-response.interface';
import { IUpdatedEntitiesResponse } from '../common/interfaces/updated-entities-response.interface';

@ApiBearerAuth()
@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  @Get('/')
  async getList(): Promise<IMemberDocument[]> {
    return this.memberService.get();
  }

  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  async find(@Param() { id }): Promise<IMemberDocument> {
    return this.memberService.find(id);
  }

  @Post('/create')
  @Roles(Role.Admin)
  async create(
    @Body(new ValidationPipe()) createMemberDto: CreateMemberDto,
  ): Promise<IMemberDocument> {
    return this.memberService.create(createMemberDto);
  }

  @ApiParam({ name: 'id', type: String })
  @Post('/update/:id')
  @Roles(Role.Admin)
  async update(
    @Param() { id },
    @Body(new ValidationPipe()) updateMemberDto: UpdateMemberDto,
  ): Promise<IUpdatedEntitiesResponse> {
    return this.memberService.update(id, updateMemberDto);
  }

  @ApiParam({ name: 'id', type: String })
  @Post('/delete/:id')
  @Roles(Role.Admin)
  async delete(@Param() { id }): Promise<IDeletedEntitiesResponse> {
    return await this.memberService.remove(id);
  }
}
