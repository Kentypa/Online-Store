import { useUserData } from "@hooks/user/use-user-data";
import { useUserVerify } from "@hooks/auth/use-user-validate";
import { AccountRecoveryPage } from "@screens/AuthPages/RecoveryPages/AccountRecoveryPage";
import { ForgetPasswordPage } from "@screens/AuthPages/RecoveryPages/ForgetPasswordPage";
import { ResetPasswordPage } from "@screens/AuthPages/RecoveryPages/ResetPasswordPage";
import { SignInPage } from "@screens/AuthPages/SignInPage";
import { SignUpPage } from "@screens/AuthPages/SignUpPage";
import { HomePage } from "@screens/HomePage";
import { ProductPage } from "@screens/StorePages/ProductPage";
import { ProductsPage } from "@screens/StorePages/ProductsPage";
import { CartPage } from "@screens/UsersPages/CartPage";
import { UserSettingsPage } from "@screens/UsersPages/SettingsPage";
import { ProtectedRoute } from "@wrappers/ProtectedRoute";
import { Routes, Route } from "react-router";
import { FC } from "react";

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
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
