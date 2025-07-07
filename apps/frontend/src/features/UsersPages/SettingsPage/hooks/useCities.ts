import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { geoService } from "@services/geoService";
import { CityTranslation } from "@shared-types/city-translation";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useCities = (enabled: boolean, regionId?: number) => {
  const { i18n } = useTranslation("user-settings");
  const { getCities } = geoService(ServiceNames.GEO, i18n.language);
  const { data, ...otherOptions } = useQuery({
    queryKey: [Queries.GEO, regionId, i18n.language],
    queryFn: ({ queryKey }) => {
      const [, regionId] = queryKey;
      return getCities(Number(regionId));
    },
    enabled,
  });

  const citiesData: CityTranslation[] = data?.data;

  return { citiesData, ...otherOptions };
};
