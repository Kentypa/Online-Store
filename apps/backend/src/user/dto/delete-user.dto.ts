import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteUserDto {
  @ApiProperty({
    example: "qwerty1234",
    description: "User password",
    type: "string",
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: "qwerty1234",
    description: "User repeated password",
    type: "string",
  })
  @IsString()
  passwordRepeat: string;
}
