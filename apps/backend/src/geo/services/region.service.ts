import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { RegionTranslation } from "../entities/region-translation.entity";

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionTranslation)
    private regionRepository: Repository<RegionTranslation>,
  ) {}

  async getRegions(
    langCode?: string,
    countryCode?: string,
    offset?: number,
    limit?: number,
  ): Promise<RegionTranslation[]> {
    const options: FindManyOptions<RegionTranslation> = {
      relations: ["region"],
      where: {},
    };

    if (langCode) {
      options.where = { ...options.where, lang_code: langCode };
    }

    if (countryCode) {
      options.where = {
        ...options.where,
        region: { country_code: countryCode },
      };
    }

    if (offset !== undefined && offset < 0) {
      throw new BadRequestException("Offset must be non-negative");
    }

    if (limit !== undefined && limit < 0) {
      throw new BadRequestException("Limit must be non-negative");
    }

    if (limit !== undefined) {
      options.skip = offset ?? 0;
      options.take = limit;
    }

    return this.regionRepository.find(options);
  }
}
