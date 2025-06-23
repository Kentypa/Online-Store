import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
    required: false,
  })
  @MaxLength(320)
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "kentik",
    description: "User name",
    type: "string",
    required: false,
  })
  @MaxLength(20)
  username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "qwerty1234",
    description: "User old password",
    type: "string",
    required: false,
  })
  @MaxLength(512)
  oldPassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "1234qwerty",
    description: "User new password",
    type: "string",
    required: false,
  })
  @MaxLength(512)
  newPassword?: string;
}
