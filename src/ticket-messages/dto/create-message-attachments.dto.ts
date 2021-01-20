import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateMessageAttachmentsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly mimetype: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly path: string;
}
