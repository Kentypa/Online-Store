import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserStats {
  @ApiProperty({
    example: "12",
    description: "User stats ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @OneToOne(() => User, (user) => user.userStats, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ApiProperty({
    example: "124",
    description: "Total count of user click coins",
    type: "number",
  })
  @Column({ type: "bigint", default: 0 })
  totalClickCoins: number;

  @ApiProperty({
    example: "124",
    description: "Total clicks of user",
    type: "number",
  })
  @Column({ type: "bigint", default: 0 })
  totalClicks: number;
}
