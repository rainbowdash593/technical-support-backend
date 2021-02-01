import { Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { IReadableUser } from './interfaces/readable-user.interface';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  @Post('/info')
  async info(@Request() req): Promise<IReadableUser> {
    return req.user;
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/profile-protected')
  @Roles(Role.User)
  protectedProfile(@Request() req) {
    return req.user;
  }
}
