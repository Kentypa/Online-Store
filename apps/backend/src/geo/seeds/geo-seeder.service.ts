import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner, EntityManager } from "typeorm";
import { Language } from "../../shared/entities/language.entity";
import { Country } from "../entities/country.entity";
import { CountryTranslation } from "../entities/country-translation.entity";
import { Region } from "../entities/region.entity";
import { RegionTranslation } from "../entities/region-translation.entity";
import { City } from "../entities/city.entity";
import { CityTranslation } from "../entities/city-translation.entity";
import { JsonCountryData } from "../types/json-country-data.type";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class GeoSeederService {
  private readonly logger = new Logger(GeoSeederService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Language)
    private readonly langRepository: Repository<Language>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(CountryTranslation)
    private readonly countryTranslationRepository: Repository<CountryTranslation>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(RegionTranslation)
    private readonly regionTranslationRepository: Repository<RegionTranslation>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(CityTranslation)
    private readonly cityTranslationRepository: Repository<CityTranslation>,
  ) {}

  async seed(): Promise<void> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.log("Seeding started...");

      await queryRunner.query("SELECT 1");
      this.logger.log("Database connection verified");

      const langEn = await this.seedLanguages("en", "English", queryRunner);
      const langUk = await this.seedLanguages("uk", "Ukrainian", queryRunner);

      const countriesData = this.loadJsonData();
      this.logger.log(
        `Loaded ${countriesData.length} countries from JSON files`,
      );

      for (const countryData of countriesData) {
        await this.seedCountry(countryData, langEn, langUk, queryRunner);
      }

      await queryRunner.commitTransaction();
      this.logger.log("Seeding completed successfully.");
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error("Seeding failed:", error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async seedLanguages(
    code: string,
    name: string,
    queryRunner: QueryRunner,
  ): Promise<Language> {
    const existingLang = await queryRunner.manager.findOne(Language, {
      where: { code },
    });

    if (existingLang) {
      this.logger.log(`Language ${code} already exists`);
      return existingLang;
    }

    const newLang = queryRunner.manager.create(Language, { code, name });
    const savedLang = await queryRunner.manager.save(newLang);
    this.logger.log(`Created language: ${name} (${code})`);
    return savedLang;
  }

  private loadJsonData(): JsonCountryData[] {
    try {
      const basePath = path.join(process.cwd(), "src", "data", "geo");

      const ukrainePath = path.join(basePath, "ukraine_expanded.json");
      const ukPath = path.join(basePath, "united_kingdom_expanded.json");

      if (!fs.existsSync(ukrainePath)) {
        throw new Error(`File not found: ${ukrainePath}`);
      }
      if (!fs.existsSync(ukPath)) {
        throw new Error(`File not found: ${ukPath}`);
      }

      const ukraineFile = fs.readFileSync(ukrainePath, "utf-8");
      const ukFile = fs.readFileSync(ukPath, "utf-8");

      const ukraineData = JSON.parse(ukraineFile) as JsonCountryData;
      const ukData = JSON.parse(ukFile) as JsonCountryData;

      this.logger.log(`Loaded Ukraine data: ${ukraineData.name}`);
      this.logger.log(`Loaded UK data: ${ukData.name}`);

      return [ukraineData, ukData];
    } catch (error) {
      this.logger.error("Error loading JSON data:", error);
      throw error;
    }
  }

  private async seedCountry(
    countryData: JsonCountryData,
    langEn: Language,
    langUk: Language,
    queryRunner: QueryRunner,
  ): Promise<void> {
    const entityManager: EntityManager = queryRunner.manager;

    try {
      const existingCountry = await entityManager.findOne(Country, {
        where: { code: countryData.iso2 },
      });

      if (existingCountry) {
        this.logger.log(`Country ${countryData.name} already exists, skipping`);
        return;
      }

      const country = entityManager.create(Country, { code: countryData.iso2 });
      const savedCountry = await entityManager.save(country);

      const countryTranslations = [
        entityManager.create(CountryTranslation, {
          country_code: savedCountry.code,
          lang_code: langEn.code,
          name: countryData.name,
        }),
        entityManager.create(CountryTranslation, {
          country_code: savedCountry.code,
          lang_code: langUk.code,
          name: countryData.translated_to_ukraine,
        }),
      ];
      await entityManager.save(countryTranslations);
      this.logger.log(`Seeded Country: ${countryData.name}`);

      for (const stateData of countryData.states) {
        const region = entityManager.create(Region, {
          country_code: savedCountry.code,
          code: stateData.state_code,
        });
        const savedRegion = await entityManager.save(region);

        const regionTranslations = [
          entityManager.create(RegionTranslation, {
            region_id: savedRegion.id,
            lang_code: langEn.code,
            name: stateData.name,
          }),
          entityManager.create(RegionTranslation, {
            region_id: savedRegion.id,
            lang_code: langUk.code,
            name: stateData.translated_to_ukraine,
          }),
        ];
        await entityManager.save(regionTranslations);
        this.logger.log(`Seeded Region: ${stateData.name}`);

        for (const cityData of stateData.cities) {
          const city = entityManager.create(City, {
            region_id: savedRegion.id,
          });
          const savedCity = await entityManager.save(city);

          const cityTranslations = [
            entityManager.create(CityTranslation, {
              city_id: savedCity.id,
              lang_code: langEn.code,
              name: cityData.name,
            }),
            entityManager.create(CityTranslation, {
              city_id: savedCity.id,
              lang_code: langUk.code,
              name: cityData.translated_to_ukraine,
            }),
          ];
          await entityManager.save(cityTranslations);
        }

        this.logger.log(
          `Seeded ${stateData.cities.length} cities for ${stateData.name}`,
        );
      }
    } catch (error) {
      this.logger.error(`Error seeding country ${countryData.name}:`, error);
      throw error;
    }
  }
}
