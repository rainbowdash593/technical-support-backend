import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '../users/enums/role.enum';
import { IUserDocument } from '../users/interfaces/user.interface';
import { IReadableUser } from '../users/interfaces/readable-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserByID(userId: string): Promise<IReadableUser> {
    const user = await this.usersService.find(userId);
    return user.toReadableUser();
  }

  async registrate(createUserDto: CreateUserDto): Promise<IReadableUser> {
    const user = await this.usersService.create(createUserDto, [Role.User]);
    return user.toReadableUser();
  }

  async generateJwtToken(user: IUserDocument): Promise<string> {
    const payload = {
      _id: user._id,
      roles: user.roles,
    };
    return this.jwtService.sign(payload);
  }

  async login({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.generateJwtToken(user);
      return user.toReadableUser(token);
    }
    throw new BadRequestException('Invalid credentials');
  }
}
