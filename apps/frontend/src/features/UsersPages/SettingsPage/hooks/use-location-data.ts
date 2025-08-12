import { useCountries } from "./use-counties";
import { useRegions } from "./use-regions";
import { useCities } from "./use-cities";

export const useLocationData = (countryCode?: string, regionId?: number) => {
  const countries = useCountries();
  const regions = useRegions(countries.isSuccess, countryCode ?? "");
  const cities = useCities(regions.isSuccess, regionId);

  return {
    countries: countries.data,
    regions: regions.data,
    cities: cities.data,
    isLoading: countries.isLoading || regions.isLoading || cities.isLoading,
  };
};
