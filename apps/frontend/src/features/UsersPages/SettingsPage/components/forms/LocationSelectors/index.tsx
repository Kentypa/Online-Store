import { ChangeEvent, FC } from "react";
import { TFunction } from "i18next";
import { ProfileForm } from "@shared-types/formData/profile-form";
import { CountryTranslation } from "@shared-types/geoTypes/country/country-translation";
import { RegionTranslation } from "@shared-types/geoTypes/region/region-translation";
import { CityTranslation } from "@shared-types/geoTypes/city/city-translation";
import { Select } from "@forms/Select";
import { Option } from "@forms/Option";

type LocationSelectorsProps = {
  t: TFunction;
  countriesData?: CountryTranslation[];
  regionsData?: RegionTranslation[];
  citiesData?: CityTranslation[];
  formState: ProfileForm;
  handleLocationChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const LocationSelectors: FC<LocationSelectorsProps> = ({
  t,
  countriesData,
  regionsData,
  citiesData,
  formState,
  handleLocationChange,
}) => (
  <>
    <Select
      handleChange={handleLocationChange}
      name="countryCode"
      id="countryCode"
      className="appearance-none"
      value={formState.countryCode}
    >
      <Option value="">{t("sections.chooseCountry")}</Option>
      {countriesData?.map((country) => (
        <Option key={country.country_code} value={country.country_code}>
          {country.name}
        </Option>
      ))}
    </Select>

    {formState.countryCode && (
      <Select
        handleChange={handleLocationChange}
        name="regionId"
        id="regionId"
        className="appearance-none"
        value={formState.regionId}
      >
        <Option value="">{t("sections.chooseRegion")}</Option>
        {regionsData?.map((region) => (
          <Option key={region.region_id} value={region.region_id}>
            {region.name}
          </Option>
        ))}
      </Select>
    )}

    {formState.regionId && (
      <Select
        handleChange={handleLocationChange}
        name="cityId"
        id="cityId"
        className="appearance-none"
        value={formState.cityId}
      >
        <Option value="">{t("sections.chooseCity")}</Option>
        {citiesData?.map((city) => (
          <Option key={city.city_id} value={city.city_id}>
            {city.name}
          </Option>
        ))}
      </Select>
    )}
  </>
);
