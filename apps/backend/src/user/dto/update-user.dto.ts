import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
    maxLength: 320,
    required: false,
  })
  @MaxLength(320)
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "Igor",
    description: "First name",
    type: "string",
    maxLength: 64,
    required: false,
  })
  @MaxLength(64)
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "Voitenko",
    description: "Last name",
    type: "string",
    required: false,
  })
  @MaxLength(64)
  lastName?: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({
    example: "+88005553535",
    description: "Phone number",
    type: "string",
    maxLength: 20,
    required: false,
  })
  @MaxLength(20)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "en",
    description: "Language code",
    type: "string",
    required: false,
  })
  languageCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "US",
    description: "Country code",
    type: "string",
    required: false,
  })
  countryCode?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "Region ID",
    type: "number",
    required: false,
  })
  regionId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "City ID",
    type: "number",
  })
  cityId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "/uploads/users/avatars/avatar.jpg",
    description: "Path to avatar",
    required: false,
    type: "string",
  })
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "oldPassword123",
    description: "Old password",
    required: false,
    type: "string",
  })
  oldPassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "newPassword123",
    description: "New password",
    required: false,
    type: "string",
  })
  newPassword?: string;
}
