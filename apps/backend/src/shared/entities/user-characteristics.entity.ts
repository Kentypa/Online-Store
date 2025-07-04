import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserCharacteristics {
  @ApiProperty({
    example: "12",
    description: "User stats ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @OneToOne(() => User, (user) => user.userCharacteristics, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @ApiProperty({
    example: "124",
    description: "Count of coins which user get after click on the game field",
    type: "number",
  })
  @Column({ type: "integer", default: 1 })
  coinsPerClick: number;

  @ApiProperty({
    example: "124",
    description: "Count of coins which user get passive by time",
    type: "number",
  })
  @Column({ type: "integer", default: 0 })
  passiveCoinsIncome: number;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user characteristics data deleted",
    type: Date,
    required: false,
  })
  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;
}
