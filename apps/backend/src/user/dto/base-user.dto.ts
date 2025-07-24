import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class BaseUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
    maxLength: 320,
  })
  email: string;
}
