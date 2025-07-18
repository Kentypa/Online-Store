import { useUserData } from "@hooks/use-user-data";
import { useUserVerify } from "@hooks/use-user-validate";
import { AccountRecoveryPage } from "@screens/AuthPages/RecoveryPages/AccountRecoveryPage";
import { ForgetPasswordPage } from "@screens/AuthPages/RecoveryPages/ForgetPasswordPage";
import { ResetPasswordPage } from "@screens/AuthPages/RecoveryPages/ResetPasswordPage";
import { SignInPage } from "@screens/AuthPages/SignInPage";
import { SignUpPage } from "@screens/AuthPages/SignUpPage";
import { HomePage } from "@screens/HomePage";
import { ProductPage } from "@screens/store/ProductPage";
import { ProductsPage } from "@screens/store/ProductsPage";
import { UserSettingsPage } from "@screens/UsersPages/SettingsPage";
import { ProtectedRoute } from "@wrappers/ProtectedRoute";
import { FC } from "react";
import { Routes, Route } from "react-router";

export const ApplicationRoutes: FC = () => {
  const { isSuccess: isAuthenticated } = useUserVerify();
  useUserData(isAuthenticated);

  return (
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="account-recovery" element={<AccountRecoveryPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="forget-password" element={<ForgetPasswordPage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="product" element={<ProductPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="user">
          <Route path="settings" element={<UserSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
