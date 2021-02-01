import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { TicketStatus } from '../enums/ticket-status.enum';
import { CreateRelatedUserDto } from './create-related-user.dto';

export class CreateTicketDto {
  @ApiProperty()
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  readonly status: TicketStatus;

  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  readonly tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly relatedId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly project: string;

  @ApiProperty({ type: CreateRelatedUserDto })
  @IsNotEmpty()
  @ValidateNested()
  readonly user: CreateRelatedUserDto;

  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}
