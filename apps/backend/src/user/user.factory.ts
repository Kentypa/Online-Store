import { Injectable } from "@nestjs/common";
import { User } from "src/shared/entities/user.entity";

@Injectable()
export class UserFactory {
  createUser(email: string, hashedPassword: string) {
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.refreshTokens = [];
    return user;
  }
}
