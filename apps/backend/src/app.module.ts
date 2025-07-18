import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { LoggerMiddleware } from "./shared/middleware/logger.middleware";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ScheduleModule } from "@nestjs/schedule";
import { GeoModule } from "./geo/geo.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { CategoryModule } from "./store/categories/categories.module";
import { ProductsModule } from "./store/products/products.module";
import { AppCacheModule } from "./cache/cache.module";
import { ReviewsModule } from "./review/reviews.module";
import projectConfig from "./config/project.config";
import encryptionConfig from "./config/encryption.config";
import jwtConfig from "./config/jwt.config";
import mailerConfig from "./config/mailer.config";
import redisConfig from "./config/redis.config";
import databaseConfig from "./config/database.config";

@Module({
  imports: [
    AppCacheModule,
    UserModule,
    AuthModule,
    GeoModule,
    CategoryModule,
    ProductsModule,
    ReviewsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        projectConfig,
        databaseConfig,
        encryptionConfig,
        jwtConfig,
        mailerConfig,
        redisConfig,
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
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: false,
        migrations: ["dist/migrations/*{.ts,.js}"],
        migrationsRun: true,
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
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
