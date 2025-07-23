import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartItemDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: "13",
    description: "ID of product from database",
    type: "number",
  })
  productId: number;
}
