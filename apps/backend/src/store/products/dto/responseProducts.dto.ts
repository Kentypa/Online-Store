import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { ProductTranslation } from "../entities/product-translation.entity";

export class responseProductsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: ProductTranslation,
  })
  data: ProductTranslation[];

  @IsNumber()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  total: number;
}
