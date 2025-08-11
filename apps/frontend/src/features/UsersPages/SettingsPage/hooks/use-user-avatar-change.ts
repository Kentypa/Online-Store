import { useState, useEffect, ChangeEvent } from "react";
import { ImageMimeTypes } from "@enums/imageMimeTypes";
import { isValidMimeType } from "../utils/isValidMimeType";
import { ProfileForm } from "@shared-types/formData/profile-form";

export const useUserAvatarChange = (
  handleChangeByValue: (
    name: keyof ProfileForm,
    value: ProfileForm[keyof ProfileForm]
  ) => void,
  avatarUrl?: string
) => {
  const [avatarPreview, setAvatarPreview] = useState<string>(avatarUrl ?? "");
  const [isError, setIsError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    setAvatarPreview(avatarUrl ?? "");
  }, [avatarUrl]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setIsError(false);

    if (file && isValidMimeType(file, Object.values(ImageMimeTypes))) {
      handleChangeByValue("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setIsError(true);
      setErrorCount((prev) => prev + 1);
    }
  };

  return {
    handleAvatarChange,
    avatarPreview,
    isError,
    errorCount,
  };
};
