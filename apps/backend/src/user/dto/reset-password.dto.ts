import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  @MaxLength(512)
  resetToken: string;

  @IsString()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  @MaxLength(512)
  newPassword: string;
}
