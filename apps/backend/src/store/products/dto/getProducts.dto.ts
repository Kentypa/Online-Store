import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SortProductsBy } from "../enums/sort-products-by.enum";
import { Type } from "class-transformer";

export class getProductsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  langCode?: string;

  @Type(() => Number)
  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  ids?: number[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  offset?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  limit?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  regionId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  categoryId?: number;

  @IsEnum(SortProductsBy)
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
  })
  sortBy?: SortProductsBy;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "boolean",
  })
  withReviews?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  query?: string;
}
