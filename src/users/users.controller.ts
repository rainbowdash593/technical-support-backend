import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
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
