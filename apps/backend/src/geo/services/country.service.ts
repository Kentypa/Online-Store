import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CountryTranslation } from "../entities/country-translation.entity";

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryTranslation)
    private countryRepository: Repository<CountryTranslation>,
  ) {}

  async getCountries(langCode?: string): Promise<CountryTranslation[]> {
    if (langCode) {
      return this.countryRepository.find({
        where: { lang_code: langCode },
      });
    }
    return this.countryRepository.find();
  }
}
