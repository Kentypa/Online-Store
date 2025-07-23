import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSearchVectorToProductTranslation1753131615317
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "product_translation"
        ADD COLUMN IF NOT EXISTS "search_vector" tsvector
      `);

    await queryRunner.query(`
        CREATE INDEX IF NOT EXISTS "idx_product_translation_search_vector"
        ON "product_translation"
        USING GIN ("search_vector")
      `);

    await queryRunner.query(`
        UPDATE "product_translation"
        SET "search_vector" = to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(description, ''))
      `);

    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_product_search_vector()
        RETURNS trigger AS $$
        BEGIN
          NEW.search_vector :=
            to_tsvector('simple', coalesce(NEW.title, '') || ' ' || coalesce(NEW.description, ''));
          RETURN NEW;
        END
        $$ LANGUAGE plpgsql;
      `);

    await queryRunner.query(`
        CREATE TRIGGER trg_product_search_vector
        BEFORE INSERT OR UPDATE ON product_translation
        FOR EACH ROW
        EXECUTE PROCEDURE update_product_search_vector();
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TRIGGER IF EXISTS trg_product_search_vector ON product_translation
      `);

    await queryRunner.query(`
        DROP FUNCTION IF EXISTS update_product_search_vector
      `);

    await queryRunner.query(`
        DROP INDEX IF EXISTS "idx_product_translation_search_vector"
      `);

    await queryRunner.query(`
        ALTER TABLE "product_translation"
        DROP COLUMN IF EXISTS "search_vector"
      `);
  }
}
