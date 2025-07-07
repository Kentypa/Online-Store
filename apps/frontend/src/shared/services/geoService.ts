import api from "@config/axios";

export function geoService(url: string, langCode: string) {
  const getCountries = async () => {
    return api
      .get(`${url}/countries`, { params: { langCode: langCode } })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const getRegions = async (countryCode: string) => {
    return api
      .get(`${url}/regions`, {
        params: { countryCode: countryCode, langCode: langCode },
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const getCities = async (regionId: number) => {
    return api
      .get(`${url}/cities`, {
        params: { regionId: regionId, langCode: langCode },
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  return { getCountries, getRegions, getCities };
}
