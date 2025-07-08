import { registerAs } from "@nestjs/config";

export default registerAs("mailer", () => ({
  gmail_auth_user: process.env.GMAIL_AUTH_USER || "",
  gmail_auth_password: process.env.GMAIL_AUTH_PASSWORD || "",
}));
