import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class RecoveryUserDto {
  @IsEmail()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
    maxLength: 320,
  })
  @MaxLength(320)
  email: string;

  @IsString()
  @ApiProperty({
    example: "qwerty1234",
    description: "User old password",
    type: "string",
    maxLength: 512,
  })
  @MaxLength(512)
  password: string;
}
