import { useState, useEffect, ChangeEvent } from "react";
import { ImageMimeTypes } from "@enums/imageMimeTypes";
import { isValidMimeType } from "../utils/isValidMimeType";
import { ProfileForm } from "@shared-types/formData/profile-form";

const isAbsoluteUrl = (url: string) => /^http?:\/\//.test(url);

const getFullUrl = (url?: string) => {
  if (!url) return "";
  return isAbsoluteUrl(url) ? url : `http://localhost:3000/${url}`;
};

export const useUserAvatarChange = (
  handleChangeByValue: (
    name: keyof ProfileForm,
    value: ProfileForm[keyof ProfileForm],
  ) => void,
  avatarUrl?: string,
) => {
  const [avatarPreview, setAvatarPreview] = useState<string>(
    getFullUrl(avatarUrl),
  );
  const [isError, setIsError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    setAvatarPreview(getFullUrl(avatarUrl));
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
