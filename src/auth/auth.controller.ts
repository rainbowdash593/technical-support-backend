import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './guards/public-route.guard';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from '../users/interfaces/readable-user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async registration(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<IReadableUser> {
    return this.authService.registrate(createUserDto);
  }

  @Public()
  @Post('sign-in')
  async login(
    @Body(new ValidationPipe()) signInDto: SignInDto,
  ): Promise<IReadableUser> {
    return this.authService.login(signInDto);
  }
}
