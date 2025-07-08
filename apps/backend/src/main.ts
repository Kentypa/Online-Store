import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express/interfaces/nest-express-application.interface";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { DocumentBuilder } from "@nestjs/swagger/dist/document-builder";
import { SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./shared/filters/http-exception.filter";
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  Logger,
} from "@nestjs/common";
import { join } from "path";
import { GeoSeederService } from "./geo/seeds/geo-seeder.service";
import cookieParser from "cookie-parser";

async function runSeeder(app: NestExpressApplication) {
  const logger = new Logger("Seeder");

  try {
    logger.log("Starting database seeding process...");

    const seeder = app.get(GeoSeederService);

    if (!seeder) {
      throw new Error("GeoSeederService not found in application context");
    }

    await seeder.seed();
    logger.log("Database seeding completed successfully!");
  } catch (error) {
    logger.error("Database seeding failed:", error);
  }
}

async function bootstrap() {
  const logger = new Logger("Bootstrap");

  try {
    logger.log("Creating NestJS application...");
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

    app.useStaticAssets(join(__dirname, "..", "uploads"), {
      prefix: "/uploads/",
    });

    app.enableCors({
      origin: `http://localhost:${configService.get("project.frontend.port") as number}`,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle("Clicker API")
      .setDescription("Clicker app api description")
      .setVersion("1.0")
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory);

    app.use(cookieParser());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    logger.log("Seeder is enabled, running database seeding...");
    await runSeeder(app);

    const port = configService.getOrThrow<number>("project.backend.port");
    await app.listen(port);

    logger.log(`Application is running on port ${port}`);
    logger.log(
      `Swagger documentation available at: http://localhost:${port}/api`,
    );
  } catch (error) {
    logger.error("Error during application bootstrap:", error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error("Critical error during bootstrap:", error);
  process.exit(1);
});
