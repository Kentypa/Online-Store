import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class CookieService {
  setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
    accessExpires: Date,
    refreshExpires: Date,
    deviceId: string,
  ): void {
    response.cookie("Authentication", accessToken, {
      httpOnly: true,
      secure: false,
      expires: accessExpires,
    });

    response.cookie("Refresh", refreshToken, {
      httpOnly: true,
      secure: false,
      expires: refreshExpires,
    });

    response.cookie("DeviceId", deviceId, {
      httpOnly: true,
      secure: false,
      expires: refreshExpires,
    });
  }

  clearAuthCookies(response: Response): void {
    response.clearCookie("Authentication", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    response.clearCookie("Refresh", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    response.clearCookie("DeviceId", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  }
}
