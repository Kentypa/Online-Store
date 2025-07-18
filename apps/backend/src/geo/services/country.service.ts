import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CountryTranslation } from "../entities/country-translation.entity";
import { Cached } from "src/shared/decorators/cached.decorator";

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryTranslation)
    private countryRepository: Repository<CountryTranslation>,
  ) {}

  @Cached(300, (langCode?: string) => `country:${langCode ?? "all"}`)
  async getCountries(langCode?: string): Promise<CountryTranslation[]> {
    if (langCode) {
      return this.countryRepository.find({
        where: { lang_code: langCode },
      });
    }
    return this.countryRepository.find();
  }
}
