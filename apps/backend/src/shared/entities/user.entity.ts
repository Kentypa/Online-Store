import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserStats } from "./user-stats.entity";
import { UserCharacteristics } from "./user-characteristics.entity";
import { UserRefreshToken } from "./user-refresh-tokens.entity";

@Entity()
export class User {
  @ApiProperty({
    example: "12",
    description: "User ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  @Column({ type: "varchar", length: 320, unique: true })
  email: string;

  @ApiProperty({
    example: "Kentik",
    description: "User name",
    type: "string",
  })
  @Column({ type: "varchar", length: 20, unique: true, nullable: true })
  username: string;

  @ApiProperty({
    example: "qwerty1234",
    description: "User password",
    type: "string",
  })
  @Column({ type: "varchar", length: 512 })
  @Exclude()
  password: string;

  @ApiProperty({
    example: "uploads/users/avatars/1748361610393-2ee0737ab7ef.gif",
    description: "Path to user avatar",
    type: "string",
  })
  @Column({ type: "varchar", length: 512, nullable: true })
  avatarUrl: string;

  @OneToOne(() => UserStats, (stats) => stats.user, {
    eager: true,
    cascade: true,
  })
  userStats: UserStats;

  @OneToOne(
    () => UserCharacteristics,
    (characteristics) => characteristics.user,
    {
      eager: true,
      cascade: true,
    },
  )
  userCharacteristics: UserCharacteristics;

  @OneToMany(() => UserRefreshToken, (token) => token.user, {
    cascade: true,
  })
  refreshTokens: UserRefreshToken[];

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user creating",
    type: Date,
  })
  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user data latest updates",
    type: Date,
  })
  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
