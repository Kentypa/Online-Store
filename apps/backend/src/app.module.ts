import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { LoggerMiddleware } from "./shared/middleware/logger.middleware";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { User } from "./shared/entities/user.entity";
import { UserRefreshToken } from "./shared/entities/user-refresh-tokens.entity";
import { ScheduleModule } from "@nestjs/schedule";
import { GeoModule } from "./geo/geo.module";
import { CityTranslation } from "./geo/entities/city-translation.entity";
import { City } from "./geo/entities/city.entity";
import { CountryTranslation } from "./geo/entities/country-translation.entity";
import { Country } from "./geo/entities/country.entity";
import { Language } from "./shared/entities/language.entity";
import { RegionTranslation } from "./geo/entities/region-translation.entity";
import { Region } from "./geo/entities/region.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { PasswordResetToken } from "./shared/entities/user-password-reset-tokens.entity";
import { Category } from "./store/categories/entities/category.entity";
import { CategoryTranslation } from "./store/categories/entities/category-translation.entity";
import projectConfig from "./config/project.config";
import databaseConfig from "./config/database.config";
import encryptionConfig from "./config/encryption.config";
import jwtConfig from "./config/jwt.config";
import mailerConfig from "./config/mailer.config";
import { CategoryModule } from "./store/categories/categories.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    GeoModule,
    CategoryModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        projectConfig,
        databaseConfig,
        encryptionConfig,
        jwtConfig,
        mailerConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.user"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.name"),
        entities: [
          User,
          UserRefreshToken,
          Language,
          City,
          CityTranslation,
          Region,
          RegionTranslation,
          Country,
          CountryTranslation,
          PasswordResetToken,
          Category,
          CategoryTranslation,
        ],
        synchronize: true,
        // migrations: ["dist/migrations/*.js"],
        // migrationsRun: true,
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: "maildev",
        port: 1025,
      },
      defaults: {
        from: '"kent-store" <kent-store@gmail.com>',
      },
      preview: true,
      template: {
        dir: __dirname + "/templates",
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("auth", "user");
  }
}
