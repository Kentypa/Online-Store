import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { geoService } from "@services/geoService";
import { RegionTranslation } from "@shared-types/geoTypes/region/region-translation";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useRegions = (enabled: boolean, countryCode: string) => {
  const { i18n } = useTranslation("user-settings");
  const { getRegions } = geoService(ServiceNames.GEO, i18n.language);
  const { ...otherOptions } = useQuery<RegionTranslation[]>({
    queryKey: [Queries.GEO, countryCode, i18n.language],
    queryFn: () => getRegions(countryCode),
    enabled,
  });

  return { ...otherOptions };
};
