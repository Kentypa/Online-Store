import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { ProductTranslation } from "../entities/product-translation.entity";

export class responseProductsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Products data",
    type: () => ProductTranslation,
    isArray: true,
  })
  data: ProductTranslation[];

  @IsNumber()
  @ApiProperty({
    example: 13,
    description: "Total pages of products",
    type: "number",
  })
  total: number;
}
