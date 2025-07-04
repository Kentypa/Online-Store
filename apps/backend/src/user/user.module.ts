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
import { UserDeleteAccountService } from "./user-deletion.service";
import { UserRefreshTokenService } from "src/shared/services/refresh-token.service";
import { UserRefreshToken } from "src/shared/entities/user-refresh-tokens.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserStats, UserRefreshToken])],
  controllers: [UserController],
  providers: [
    UserRefreshTokenService,
    UserService,
    EncryptionService,
    CookieService,
    UserAccountService,
    UserFactory,
    UserDeleteAccountService,
  ],
  exports: [UserService, UserAccountService],
})
export class UserModule {}
