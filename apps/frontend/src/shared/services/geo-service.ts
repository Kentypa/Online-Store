import api from "@config/axios";
import { CityTranslation } from "@shared-types/geoTypes/city/city-translation";
import { CountryTranslation } from "@shared-types/geoTypes/country/country-translation";
import { RegionTranslation } from "@shared-types/geoTypes/region/region-translation";
import { apiErrorHandler } from "@utils/api-error-handler";

export function geoService(url: string, langCode: string) {
  const getCountries = async () => {
    return apiErrorHandler(() =>
      api.get<CountryTranslation[]>(`/api/${url}/countries`, {
        params: { langCode },
      })
    );
  };

  const getRegions = async (countryCode: string) => {
    return apiErrorHandler(() =>
      api.get<RegionTranslation[]>(`/api/${url}/regions`, {
        params: { countryCode, langCode },
      })
    );
  };

  const getCities = async (regionId: number) => {
    return apiErrorHandler(() =>
      api.get<CityTranslation[]>(`/api/${url}/cities`, {
        params: { regionId, langCode },
      })
    );
  };

  return { getCountries, getRegions, getCities };
}
