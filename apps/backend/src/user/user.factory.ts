import { Injectable } from "@nestjs/common";
import { UserCharacteristics } from "src/shared/entities/user-characteristics.entity";
import { UserStats } from "src/shared/entities/user-stats.entity";
import { User } from "src/shared/entities/user.entity";

@Injectable()
export class UserFactory {
  createUser(email: string, hashedPassword: string) {
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.userStats = new UserStats();
    user.userCharacteristics = new UserCharacteristics();
    user.refreshTokens = [];
    return user;
  }
}
