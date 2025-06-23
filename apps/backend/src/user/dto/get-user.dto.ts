import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BaseUserDto } from "./base-user.dto";
import { UserStats } from "src/shared/entities/user-stats.entity";
import { UserCharacteristics } from "src/shared/entities/user-characteristics.entity";

export class GetUserDto extends BaseUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: "ID of user",
    type: "number",
    minimum: 1,
  })
  id: number;

  @ApiProperty({
    example: ".Kent",
    description: "User name",
    type: "string",
    nullable: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: "/usr/bin/backend/public/images/avatars/174364236-343243image.png",
    description: "Path to user avatar",
    type: "string",
    nullable: true,
  })
  @IsString()
  avatarUrl: string;

  @ApiProperty({ type: UserStats })
  userStats: UserStats;

  @ApiProperty({ type: UserCharacteristics })
  userCharacteristics: UserCharacteristics;
}
