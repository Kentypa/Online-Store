import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
@Exclude()
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: "12",
    description: "Password reset token ID",
    type: "number",
  })
  id: number;

  @ManyToOne(() => User, (user) => user.passwordResetTokens, {
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
  resetToken: string;

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
    type: "boolean",
  })
  @Column({ type: "boolean", default: false })
  used: boolean;
}
