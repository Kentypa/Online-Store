import { useCountries } from "./useCountries";
import { useRegions } from "./useRegions";
import { useCities } from "./useCities";

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
