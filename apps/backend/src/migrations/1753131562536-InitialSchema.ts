import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1753131562536 implements MigrationInterface {
  name = "InitialSchema1753131562536";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_refresh_token" ("userId" integer NOT NULL, "deviceId" uuid NOT NULL, "refreshToken" character varying(512), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresDate" TIMESTAMP, CONSTRAINT "PK_0d44dc26874c272edf7e2c09a36" PRIMARY KEY ("userId", "deviceId"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_0d44dc26874c272edf7e2c09a3" ON "user_refresh_token" ("userId", "deviceId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "language" ("code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_465b3173cdddf0ac2d3fe73a33c" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "country_translation" ("country_code" character varying NOT NULL, "lang_code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bceb4f206a0680aebeea19e40bc" PRIMARY KEY ("country_code", "lang_code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "region_translation" ("region_id" integer NOT NULL, "lang_code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_41a9b5b6236c361c2791ff12df4" PRIMARY KEY ("region_id", "lang_code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "city_translation" ("city_id" integer NOT NULL, "lang_code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_804c79c48446b111bf3d2228677" PRIMARY KEY ("city_id", "lang_code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "city" ("id" SERIAL NOT NULL, "region_id" integer NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "region" ("id" SERIAL NOT NULL, "country_code" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_74f7723fdff738f92929c0056cb" UNIQUE ("code"), CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "country" ("code" character varying NOT NULL, CONSTRAINT "PK_8ff4c23dc9a3f3856555bd86186" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_translation" ("category_id" integer NOT NULL, "lang_code" character varying NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_41a9596196d3dcec5fbffa47c9b" PRIMARY KEY ("category_id", "lang_code"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41a9596196d3dcec5fbffa47c9" ON "category_translation" ("category_id", "lang_code") `,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "parent_id" integer, "image_url" character varying, "deletedAt" TIMESTAMP, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_translation" ("product_id" integer NOT NULL, "lang" character varying(2) NOT NULL, "title" character varying(128) NOT NULL, "description" text NOT NULL, "search_vector" tsvector, CONSTRAINT "PK_d1ba6c09e39d7de5910a70d0264" PRIMARY KEY ("product_id", "lang"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_stats" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "region_id" integer NOT NULL, "total_sold" integer NOT NULL DEFAULT '0', "period_type_code" character varying(20) NOT NULL, "period_date" date NOT NULL, CONSTRAINT "PK_7e42e0367a044aeed5997a1932e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "review" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "product_id" integer NOT NULL, "rating" integer NOT NULL, "comment" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'USD', "stock" integer NOT NULL DEFAULT '0', "main_image_url" character varying(256) NOT NULL, "other_image_urls" text array, "category_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_item" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4d1b9b5d453b11717f25dea6db" ON "cart_item" ("user_id", "product_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(320) NOT NULL, "firstName" character varying(64), "lastName" character varying(64), "phoneNumber" character varying(20), "password" character varying(512) NOT NULL, "avatarUrl" character varying(512), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "languageCode" character varying, "countryCode" character varying, "regionId" integer, "cityId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "password_reset_token" ("id" SERIAL NOT NULL, "resetToken" character varying(512), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "used" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_838af121380dfe3a6330e04f5bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_refresh_token" ADD CONSTRAINT "FK_9e2418637bd2ee8d14c7ccb1e34" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "country_translation" ADD CONSTRAINT "FK_e39417d557e90e1287e86d98dc7" FOREIGN KEY ("country_code") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "country_translation" ADD CONSTRAINT "FK_d9680108f044f800a8ad3988a19" FOREIGN KEY ("lang_code") REFERENCES "language"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "region_translation" ADD CONSTRAINT "FK_d22290b776ca3be5afd36015e75" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "region_translation" ADD CONSTRAINT "FK_c948adeec8f4888926d1e8e9463" FOREIGN KEY ("lang_code") REFERENCES "language"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "city_translation" ADD CONSTRAINT "FK_4a780dcce9709842b5c11407719" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "city_translation" ADD CONSTRAINT "FK_7c0615162532aaca3ecb4234cb8" FOREIGN KEY ("lang_code") REFERENCES "language"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_0b663dca66456beb75ec93de9fc" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "region" ADD CONSTRAINT "FK_4b1f5372ddb2adb79ec20e42b83" FOREIGN KEY ("country_code") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_translation" ADD CONSTRAINT "FK_e2c538aafd6262f061936460f1d" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_translation" ADD CONSTRAINT "FK_e7ddd70b17ee1a514b5bedf3b8b" FOREIGN KEY ("lang_code") REFERENCES "language"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_translation" ADD CONSTRAINT "FK_045befe4da0d3c207a981f4e88b" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_translation" ADD CONSTRAINT "FK_db0e7fa4063f3346418d42f849f" FOREIGN KEY ("lang") REFERENCES "language"("code") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_stats" ADD CONSTRAINT "FK_aaf46169d71952a77651a2e2ec4" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_stats" ADD CONSTRAINT "FK_6cd15fd6af738d66fce868c515c" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_3f1aaffa650d3e443f32459c4c5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_67a2e8406e01ffa24ff9026944e" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_3cf7b738220f8ba0ecfd34e0c8c" FOREIGN KEY ("languageCode") REFERENCES "language"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_5879d457928036e9c5ec1c4f098" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_f1a2565b8f2580a146871cf1142" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_beb5846554bec348f6baf449e83" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "password_reset_token" ADD CONSTRAINT "FK_a4e53583f7a8ab7d01cded46a41" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_reset_token" DROP CONSTRAINT "FK_a4e53583f7a8ab7d01cded46a41"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_beb5846554bec348f6baf449e83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_f1a2565b8f2580a146871cf1142"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_5879d457928036e9c5ec1c4f098"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_3cf7b738220f8ba0ecfd34e0c8c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_67a2e8406e01ffa24ff9026944e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_3f1aaffa650d3e443f32459c4c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_26b533e15b5f2334c96339a1f08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_81446f2ee100305f42645d4d6c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_stats" DROP CONSTRAINT "FK_6cd15fd6af738d66fce868c515c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_stats" DROP CONSTRAINT "FK_aaf46169d71952a77651a2e2ec4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_translation" DROP CONSTRAINT "FK_db0e7fa4063f3346418d42f849f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_translation" DROP CONSTRAINT "FK_045befe4da0d3c207a981f4e88b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_translation" DROP CONSTRAINT "FK_e7ddd70b17ee1a514b5bedf3b8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_translation" DROP CONSTRAINT "FK_e2c538aafd6262f061936460f1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "region" DROP CONSTRAINT "FK_4b1f5372ddb2adb79ec20e42b83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_0b663dca66456beb75ec93de9fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city_translation" DROP CONSTRAINT "FK_7c0615162532aaca3ecb4234cb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city_translation" DROP CONSTRAINT "FK_4a780dcce9709842b5c11407719"`,
    );
    await queryRunner.query(
      `ALTER TABLE "region_translation" DROP CONSTRAINT "FK_c948adeec8f4888926d1e8e9463"`,
    );
    await queryRunner.query(
      `ALTER TABLE "region_translation" DROP CONSTRAINT "FK_d22290b776ca3be5afd36015e75"`,
    );
    await queryRunner.query(
      `ALTER TABLE "country_translation" DROP CONSTRAINT "FK_d9680108f044f800a8ad3988a19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "country_translation" DROP CONSTRAINT "FK_e39417d557e90e1287e86d98dc7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_refresh_token" DROP CONSTRAINT "FK_9e2418637bd2ee8d14c7ccb1e34"`,
    );
    await queryRunner.query(`DROP TABLE "password_reset_token"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4d1b9b5d453b11717f25dea6db"`,
    );
    await queryRunner.query(`DROP TABLE "cart_item"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "review"`);
    await queryRunner.query(`DROP TABLE "product_stats"`);
    await queryRunner.query(`DROP TABLE "product_translation"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_41a9596196d3dcec5fbffa47c9"`,
    );
    await queryRunner.query(`DROP TABLE "category_translation"`);
    await queryRunner.query(`DROP TABLE "country"`);
    await queryRunner.query(`DROP TABLE "region"`);
    await queryRunner.query(`DROP TABLE "city"`);
    await queryRunner.query(`DROP TABLE "city_translation"`);
    await queryRunner.query(`DROP TABLE "region_translation"`);
    await queryRunner.query(`DROP TABLE "country_translation"`);
    await queryRunner.query(`DROP TABLE "language"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0d44dc26874c272edf7e2c09a3"`,
    );
    await queryRunner.query(`DROP TABLE "user_refresh_token"`);
  }
}
