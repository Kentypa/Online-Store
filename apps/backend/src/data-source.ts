import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  username: process.env.POSTGRES_USER || "kentadmin",
  password: process.env.POSTGRES_PASSWORD || "1234",
  database: process.env.POSTGRES_DB || "kentdb",
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
});
