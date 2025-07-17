import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SortProductsBy } from "../enums/sort-products-by.enum";

export class getProductsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  langCode?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  id?: number;

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
}
