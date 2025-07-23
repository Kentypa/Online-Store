import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCartItemDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: "13",
    description: "Quantity of cart item",
    type: "number",
  })
  quantity: number;
}
