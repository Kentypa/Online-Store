import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { SortProductsBy } from "../enums/sort-products-by.enum";

export class GetProductsQuery {
  @IsOptional()
  @IsString()
  langCode?: string;

  @IsOptional()
  @Type(() => Number)
  @IsArray()
  ids?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  regionId?: number;

  @IsOptional()
  @IsEnum(SortProductsBy)
  sortBy?: SortProductsBy;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  withReviews?: boolean;

  @IsOptional()
  @IsString()
  query?: string;
}
