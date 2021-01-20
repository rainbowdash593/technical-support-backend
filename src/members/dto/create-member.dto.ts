import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserMessengerDto } from '../../users/dto/create-user-messenger.dto';

export class CreateMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly tag: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly messengers: CreateUserMessengerDto[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
