import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsEmail,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { RelatedUserType } from '../enums/related-user-type.enum';

export class BasicRelatedUserInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class CreateRelatedUserPartnerDto extends BasicRelatedUserInfoDto {}

export class CreateRelatedUserManagerDto extends BasicRelatedUserInfoDto {}

export class CreateRelatedUserDto extends BasicRelatedUserInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(RelatedUserType)
  readonly type: RelatedUserType;

  @ApiProperty({ type: CreateRelatedUserPartnerDto })
  @IsNotEmpty()
  @ValidateNested()
  readonly partner: CreateRelatedUserPartnerDto;

  @ApiProperty({ type: CreateRelatedUserManagerDto })
  @IsNotEmpty()
  @ValidateNested()
  readonly manager: CreateRelatedUserManagerDto;
}
