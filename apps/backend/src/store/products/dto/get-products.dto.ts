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
    example: "en",
    description: "Language code from standart",
    type: "string",
    required: false,
  })
  langCode?: string;

  @Type(() => Number)
  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2, 3, 4],
    description: "Array of ids of products",
    type: "number",
    required: false,
    isArray: true,
  })
  ids?: number[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 13,
    description: "Offset to get products",
    type: "number",
  })
  offset?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 13,
    description: "Limit to get products",
    type: "number",
    required: false,
  })
  limit?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 13,
    description: "Region ID",
    type: "number",
    required: false,
  })
  regionId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 13,
    description: "Category ID",
    type: "number",
    required: false,
  })
  categoryId?: number;

  @IsEnum(SortProductsBy)
  @IsOptional()
  @ApiProperty({
    example: SortProductsBy.PRICE_DESC,
    description: "Products sorting method",
    type: () => SortProductsBy,
    required: false,
  })
  sortBy?: SortProductsBy;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: "Return with product their reviews",
    type: "boolean",
    required: false,
  })
  withReviews?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "Salty",
    description: "Query for search products",
    type: "string",
    required: false,
  })
  query?: string;
}
