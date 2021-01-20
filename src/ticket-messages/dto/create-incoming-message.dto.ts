import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMessageAttachmentsDto } from './create-message-attachments.dto';
import { BasicRelatedUserInfoDto } from '../../tickets/dto/create-related-user.dto';

export class CreateIncomingMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly ticketId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @ApiProperty({ type: BasicRelatedUserInfoDto })
  @IsNotEmpty()
  @ValidateNested()
  readonly user: BasicRelatedUserInfoDto;

  @ApiPropertyOptional({ type: CreateIncomingMessageDto })
  @IsOptional()
  @ValidateNested()
  readonly attachments: CreateMessageAttachmentsDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly postedAt: number;
}
