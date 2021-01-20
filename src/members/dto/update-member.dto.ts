import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserMessengerDto } from '../../users/dto/create-user-messenger.dto';

export class UpdateMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly tag: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly messengers: CreateUserMessengerDto[];

  readonly updatedAt: Date;
}
