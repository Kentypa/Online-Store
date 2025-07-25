import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { geoService } from "@services/geo-service";
import { CityTranslation } from "@shared-types/geoTypes/city/city-translation";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useCities = (enabled: boolean, regionId?: number) => {
  const { i18n } = useTranslation("user-settings");
  const { getCities } = geoService(ServiceNames.GEO, i18n.language);
  const { ...otherOptions } = useQuery<CityTranslation[]>({
    queryKey: [Queries.GEO, regionId, i18n.language],
    queryFn: () => getCities(Number(regionId)),
    enabled,
  });

  return { ...otherOptions };
};
