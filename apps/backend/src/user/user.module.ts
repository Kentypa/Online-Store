import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../shared/entities/user.entity";
import { UserService } from "./user.service";
import { EncryptionService } from "src/shared/services/encryption.service";
import { UserController } from "./user.controller";
import { UserAccountService } from "./user-account.service";
import { UserStats } from "src/shared/entities/user-stats.entity";
import { UserFactory } from "./user.factory";
import { CookieService } from "src/shared/services/cookie.service";
@Module({
  imports: [TypeOrmModule.forFeature([User, UserStats])],
  controllers: [UserController],
  providers: [
    UserService,
    EncryptionService,
    CookieService,
    UserAccountService,
    UserFactory,
  ],
  exports: [UserService, UserAccountService],
})
export class UserModule {}
