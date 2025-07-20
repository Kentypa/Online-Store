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
    example: "test@gmail.com",
    description: "User email",
    type: "number",
  })
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "number",
  })
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  @MaxLength(500)
  comment: string;
}
