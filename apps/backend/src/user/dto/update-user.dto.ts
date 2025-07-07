import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  @MaxLength(320)
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "Igor",
    description: "First name",
    type: "string",
  })
  @MaxLength(64)
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "Voitenko",
    description: "Last name",
    type: "string",
  })
  @MaxLength(64)
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "+88005553535",
    description: "Phone number",
    type: "string",
  })
  @MaxLength(20)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "en",
    description: "Language code",
    type: "string",
  })
  languageCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "US",
    description: "Country code",
    type: "string",
  })
  countryCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 1,
    description: "Region ID",
    type: "string",
  })
  regionId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 1,
    description: "City ID",
    type: "string",
  })
  cityId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "/uploads/users/avatars/avatar.jpg",
    description: "Path to avatar",
    type: "string",
  })
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "oldPassword123",
    description: "Old password",
  })
  oldPassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "newPassword123",
    description: "New password",
  })
  newPassword?: string;
}
