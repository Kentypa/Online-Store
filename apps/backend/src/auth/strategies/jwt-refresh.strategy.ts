import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, JwtFromRequestFunction } from "passport-jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../types/jwt-payload.type";
import { AuthService } from "../auth.service";

const cookieExtractor: JwtFromRequestFunction = (
  req: Request,
): string | null => {
  return typeof req?.cookies?.Refresh === "string" ? req.cookies.Refresh : null;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: configService.getOrThrow("jwt.refresh_token_secret"),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    const refreshToken = cookieExtractor(request);
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not found");
    }

    const deviceId = request.headers["device-id"] as string;
    if (!deviceId) {
      throw new UnauthorizedException("Device ID not found");
    }

    const user = await this.authService.getById(parseInt(payload.sub));

    return this.authService.verifyUserRefreshToken(
      user,
      deviceId,
      refreshToken,
    );
  }
}
