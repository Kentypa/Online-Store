import { AccountRecoveryPage } from "@screens/AuthPages/RecoveryPages/AccountRecoveryPage";
import { ForgetPasswordPage } from "@screens/AuthPages/RecoveryPages/ForgetPasswordPage";
import { ResetPasswordPage } from "@screens/AuthPages/RecoveryPages/ResetPasswordPage";
import { SignInPage } from "@screens/AuthPages/SignInPage";
import { SignUpPage } from "@screens/AuthPages/SignUpPage";
import { UserSettingsPage } from "@screens/UsersPages/SettingsPage";
import { FC } from "react";
import { Routes, Route } from "react-router";

export const ApplicationRoutes: FC = () => {
  // const { isSuccess: isAuthenticated } = useUserVerify();
  // const { isSuccess: isUserDataFetched } = useUserData(isAuthenticated);

  return (
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="account-recovery" element={<AccountRecoveryPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="forget-password" element={<ForgetPasswordPage />} />
      <Route path="user">
        <Route path="settings" element={<UserSettingsPage />} />
      </Route>
    </Routes>
  );
};
