import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { geoService } from "@services/geoService";
import { RegionTranslation } from "@shared-types/region-translation";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useRegions = (enabled: boolean, countryCode: string) => {
  const { i18n } = useTranslation("user-settings");
  const { getRegions } = geoService(ServiceNames.GEO, i18n.language);
  const { data, ...otherOptions } = useQuery({
    queryKey: [Queries.GEO, countryCode, i18n.language],
    queryFn: ({ queryKey }) => {
      const [, countryCode] = queryKey;
      return getRegions(countryCode);
    },
    enabled,
  });

  const regionsData: RegionTranslation[] = data?.data;

  return { regionsData, ...otherOptions };
};
