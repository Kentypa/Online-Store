import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/userService";
import { ProfileForm } from "@shared-types/profile-form";
import { changeByData } from "@stores/user/userSlice";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@hooks/redux";
import { UserData } from "@shared-types/user-data";

export const useUpdateUser = (
  email?: string,
  firstName?: string,
  lastName?: string,
  country?: string,
  region?: string,
  city?: string,
  phone?: string
) => {
  const { updateUserData } = userService(ServiceNames.USER);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { mutate, isSuccess, ...otherOptions } = useMutation<
    UserData,
    Error,
    FormData
  >({
    mutationFn: updateUserData,
    onSuccess: (updatedUser) => {
      dispatch(
        changeByData({
          ...updatedUser,
          avatarUrl: updatedUser.avatarUrl
            ? `http://localhost:3000/${updatedUser.avatarUrl}`
            : "",
        })
      );
      queryClient.refetchQueries({ queryKey: [Queries.USER] });
    },
  });

  const handleUpdatedUser = (data: ProfileForm) => {
    const formData = new FormData();
    if (data.email && data.email.trim() && data.email !== email)
      formData.append("email", data.email);
    if (data.firstName && data.firstName.trim() && data.firstName !== firstName)
      formData.append("firstName", data.firstName);
    if (data.lastName && data.lastName.trim() && data.lastName !== lastName)
      formData.append("lastName", data.lastName);
    if (data.country && data.country.trim() && data.country !== country)
      formData.append("country", data.country);
    if (data.region && data.region.trim() && data.region !== region)
      formData.append("region", data.region);
    if (data.city && data.city.trim() && data.city !== city)
      formData.append("city", data.city);
    if (data.phone && data.phone.trim() && data.phone !== phone)
      formData.append("region", data.phone);
    if (data.avatar instanceof File) formData.append("avatar", data.avatar);
    if (data.oldPassword && data.newPassword) {
      formData.append("oldPassword", data.oldPassword);
      formData.append("newPassword", data.newPassword);
    }

    mutate(formData);
  };

  return { handleUpdatedUser, isSuccess, ...otherOptions };
};
