import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { geoService } from "@services/geo-service";
import { CountryTranslation } from "@shared-types/geoTypes/country/country-translation";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useCountries = () => {
  const { i18n } = useTranslation("user-settings");
  const { getCountries } = geoService(ServiceNames.GEO, i18n.language);
  const { ...otherOptions } = useQuery<CountryTranslation[]>({
    queryKey: [Queries.GEO, i18n.language],
    queryFn: getCountries,
  });

  return { ...otherOptions };
};
