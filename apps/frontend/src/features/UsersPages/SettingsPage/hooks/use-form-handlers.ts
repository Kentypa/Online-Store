import { ChangeEvent } from "react";
import { ProfileForm } from "@shared-types/formData/profile-form";

export const useFormHandlers = (
  updateForm: <K extends keyof ProfileForm>(
    name: K,
    value: ProfileForm[K],
  ) => void,
) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    updateForm(e.target.name as keyof ProfileForm, e.target.value);
  };

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "countryCode") {
      updateForm("countryCode", value);
      updateForm("regionId", undefined);
      updateForm("cityId", undefined);
    } else if (name === "regionId") {
      updateForm("regionId", Number(value));
      updateForm("cityId", undefined);
    } else if (name === "cityId") {
      updateForm("cityId", Number(value));
    }
  };

  return { handleInputChange, handleLocationChange };
};
