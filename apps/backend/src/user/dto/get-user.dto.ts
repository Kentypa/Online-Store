import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional } from "class-validator";
import { City } from "src/geo/entities/city.entity";
import { Country } from "src/geo/entities/country.entity";
import { Language } from "src/shared/entities/language.entity";
import { Region } from "src/geo/entities/region.entity";

export class GetUserDto {
  @ApiProperty({
    example: 1,
    description: "ID of user",
    type: "number",
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: "Igor",
    description: "User firstname",
    nullable: true,
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: "Voitenko",
    description: "User lastname",
    nullable: true,
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: "+88005553535",
    description: "User phone number",
    nullable: true,
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    example: "/uploads/users/avatars/1748361610393-2ee0737ab7ef.gif",
    description: "Path to user avatar",
    nullable: true,
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    example: "en",
    description: "User language code",
    nullable: true,
    type: () => Language,
    required: false,
  })
  @IsOptional()
  @IsString()
  languageCode?: Language;

  @ApiProperty({
    example: "US",
    description: "User country code",
    nullable: true,
    required: false,
    type: () => Country,
  })
  @IsOptional()
  @IsString()
  countryCode?: Country;

  @ApiProperty({
    example: 1,
    description: "Region ID",
    nullable: true,
    type: () => Region,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  regionId?: Region;

  @ApiProperty({
    example: 1,
    description: "City ID",
    nullable: true,
    type: () => City,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  cityId?: City;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user creation",
    type: () => Date,
    required: false,
  })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of last user update",
    type: () => Date,
    required: false,
  })
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user deletion",
    type: () => Date,
    required: false,
  })
  @IsOptional()
  deletedAt?: Date;
}
