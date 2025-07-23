import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class WriteReviewDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 13,
    description: "Product ID",
    type: "number",
  })
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 3,
    description: "Rating of product at current review",
    type: "number",
    maximum: 5,
    minimum: 1,
  })
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Nice product",
    description: "Commentary to product from review",
    type: "string",
    maxLength: 500,
  })
  @MaxLength(500)
  comment: string;
}
