import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
@Exclude()
@Index(["userId", "deviceId"], { unique: true })
export class UserRefreshToken {
  @ApiProperty({
    example: "12",
    description: "User ID",
    type: "number",
  })
  @PrimaryColumn({ type: "integer" })
  userId: number;

  @ApiProperty({
    example: "124",
    description: "Device UUID",
    type: "number",
  })
  @PrimaryColumn({ type: "uuid" })
  deviceId: string;

  @ApiProperty({
    description: "Relationships with user column in database",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.refreshTokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @ApiProperty({
    example: "124",
    description: "Count of coins which user get after click on the game field",
    type: "number",
  })
  @Column({ type: "varchar", length: 512, nullable: true })
  refreshToken: string;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user creating",
    type: Date,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user data latest updates",
    type: Date,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user data latest updates",
    type: Date,
  })
  @Column({ type: "timestamp", nullable: true })
  expiresDate: Date;
}
