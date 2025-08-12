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
        <Option key={country.countryCode} value={country.countryCode}>
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
          <Option key={region.regionId} value={region.regionId}>
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
          <Option key={city.cityId} value={city.cityId}>
            {city.name}
          </Option>
        ))}
      </Select>
    )}
  </>
);
