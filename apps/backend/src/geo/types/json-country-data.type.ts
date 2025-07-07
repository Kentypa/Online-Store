export type JsonCountryData = {
  id: number;
  name: string;
  translated_to_ukraine: string;
  iso2: string;
  iso3: string;
  states: {
    id: number;
    name: string;
    translated_to_ukraine: string;
    state_code: string;
    cities: {
      id: number;
      name: string;
      translated_to_ukraine: string;
    }[];
  }[];
};
