import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateMessageAttachmentsDto } from '../../ticket-messages/dto/create-message-attachments.dto';

export class CreateOutgoingTeamMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly team: string;

  @ApiPropertyOptional({ type: CreateMessageAttachmentsDto })
  @IsOptional()
  @ValidateNested()
  readonly attachments: CreateMessageAttachmentsDto;
}
