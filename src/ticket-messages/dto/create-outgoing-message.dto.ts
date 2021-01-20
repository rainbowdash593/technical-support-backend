import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateMessageAttachmentsDto } from './create-message-attachments.dto';

export class CreateOutgoingMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly ticketId: string;

  @ApiPropertyOptional({ type: CreateMessageAttachmentsDto })
  @IsOptional()
  @ValidateNested()
  readonly attachments: CreateMessageAttachmentsDto;
}
