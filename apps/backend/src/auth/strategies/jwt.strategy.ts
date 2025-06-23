import { ExtractJwt, JwtFromRequestFunction, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../types/jwt-payload.type";
import { UserService } from "src/user/user.service";

const cookieExtractor: JwtFromRequestFunction = (
  req: Request,
): string | null => {
  return typeof req?.cookies?.Authentication === "string"
    ? req.cookies.Authentication
    : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>("jwt.access_token_secret"),
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.getById(parseInt(payload.sub));
  }
}
