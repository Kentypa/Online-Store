import { registerAs } from "@nestjs/config";

export default registerAs("project", () => ({
  frontend: {
    port: process.env.FE_PORT || 5173,
    url: process.env.FE_URL,
  },
  backend: {
    port: process.env.BE_PORT || 3000,
  },
}));
