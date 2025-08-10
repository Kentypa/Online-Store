import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/user-service";
import { changeByData } from "@stores/user/userSlice";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@hooks/core/redux";
import { ProfileForm } from "@shared-types/formData/profile-form";
import { UserData } from "@shared-types/auth/user-data";
import { BACKEND_URL } from "@config/config";

export const useUpdateUser = ({
  cityId,
  countryCode,
  email,
  firstName,
  lastName,
  phoneNumber,
  regionId,
}: ProfileForm) => {
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
            ? `${BACKEND_URL}/${updatedUser.avatarUrl}`
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
    if (
      data.countryCode &&
      data.countryCode.trim() &&
      data.countryCode !== countryCode
    )
      formData.append("countryCode", data.countryCode);
    if (data.regionId && data.regionId !== regionId)
      formData.append("regionId", String(data.regionId));
    if (data.cityId && data.cityId !== cityId)
      formData.append("cityId", String(data.cityId));
    if (
      data.phoneNumber &&
      data.phoneNumber.trim() &&
      data.phoneNumber !== phoneNumber
    )
      formData.append("phoneNumber", data.phoneNumber);
    if (data.avatar instanceof File) formData.append("avatar", data.avatar);
    if (data.oldPassword && data.newPassword) {
      formData.append("oldPassword", data.oldPassword);
      formData.append("newPassword", data.newPassword);
    }

    mutate(formData);
  };

  return { handleUpdatedUser, isSuccess, ...otherOptions };
};
