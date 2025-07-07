import { ImageMimeTypes } from "@enums/imageMimeTypes";
import { ProfileForm } from "@shared-types/profile-form";
import { useState, ChangeEvent, useEffect } from "react";
import { isValidMimeType } from "../utils/isValidMimeType";

const imageMimeTypes = [
  ImageMimeTypes.GIF,
  ImageMimeTypes.JPEG,
  ImageMimeTypes.JPG,
  ImageMimeTypes.PNG,
];

export const useUserAvatarChange = (
  handleChangeByValue: (
    name: keyof ProfileForm,
    value: string | File | undefined
  ) => void,
  avatarUrl?: string
) => {
  const [avatarPreview, setAvatarPreview] = useState(avatarUrl || "");
  const [isError, setIsError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (avatarUrl) setAvatarPreview(avatarUrl);
  }, [avatarUrl]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setIsError(false);

    if (file && isValidMimeType(file, imageMimeTypes)) {
      handleChangeByValue("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setIsError(true);
      setErrorCount((prev) => prev + 1);
    }
  };

  return { handleAvatarChange, avatarPreview, isError, errorCount };
};
