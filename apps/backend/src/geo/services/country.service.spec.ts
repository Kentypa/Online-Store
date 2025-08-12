import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CountryService } from "./country.service";
import { CountryTranslation } from "../entities/country-translation.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Country } from "../entities/country.entity";

jest.mock("../../shared/decorators/cached.decorator", () => ({
  Cached:
    () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
      descriptor,
}));

const createMockCountry = (code: string): Country => {
  const country = new Country();
  country.code = code;
  return country;
};

const createMockCountryTranslation = (
  langCode: string,
  name: string,
  country: Country,
): CountryTranslation => {
  const translation = new CountryTranslation();
  translation.langCode = langCode;
  translation.name = name;
  translation.country = country;
  return translation;
};

describe("CountryService", () => {
  let service: CountryService;
  let repository: Repository<CountryTranslation>;
  let cacheManager: Cache;

  const mockCountry1 = createMockCountry("en");
  const mockCountry2 = createMockCountry("uk");

  const mockCountryTranslations: CountryTranslation[] = [
    createMockCountryTranslation("en", "Ukraine", mockCountry1),
    createMockCountryTranslation("uk", "Україна", mockCountry2),
  ];

  beforeEach(async () => {
    cacheManager = {
      cacheId: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      mget: jest.fn(),
      mset: jest.fn(),
      mdel: jest.fn(),
      ttl: jest.fn(),
      wrap: jest.fn(),
      clear: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      disconnect: jest.fn(),
      stores: [],
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(CountryTranslation),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheManager,
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    repository = module.get(getRepositoryToken(CountryTranslation));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getCountries", () => {
    it("should return all countries when no langCode provided", async () => {
      const findSpy = jest
        .spyOn(repository, "find")
        .mockResolvedValue(mockCountryTranslations);

      const result = await service.getCountries();

      expect(findSpy).toHaveBeenCalledWith();
      expect(result).toEqual(mockCountryTranslations);
    });

    it("should return countries filtered by langCode", async () => {
      const filteredCountries = [mockCountryTranslations[0]];
      const findSpy = jest
        .spyOn(repository, "find")
        .mockResolvedValue(filteredCountries);

      const result = await service.getCountries("en");

      expect(findSpy).toHaveBeenCalledWith({
        where: { lang_code: "en" },
      });
      expect(result).toEqual(filteredCountries);
    });

    it("should handle repository errors", async () => {
      const error = new Error("Database error");
      jest.spyOn(repository, "find").mockRejectedValue(error);

      await expect(service.getCountries()).rejects.toThrow("Database error");
    });

    it("should return empty array when no countries found", async () => {
      jest.spyOn(repository, "find").mockResolvedValue([]);

      const result = await service.getCountries("nonexistent");

      expect(result).toEqual([]);
    });
  });
});
