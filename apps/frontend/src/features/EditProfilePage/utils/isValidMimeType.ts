export const isValidMimeType = (file: File, availableMimeTypes: string[]) => {
  if (availableMimeTypes.includes(file.type)) {
    return true;
  }

  return false;
};
