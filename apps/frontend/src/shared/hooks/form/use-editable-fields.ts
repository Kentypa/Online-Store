import { useState } from "react";

export const useEditableFields = (
  initialState: Record<string, boolean> = {},
) => {
  const [editFields, setEditFields] = useState(initialState);

  const toggleEdit = (field: keyof typeof editFields) =>
    setEditFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

  return { editFields, toggleEdit };
};
