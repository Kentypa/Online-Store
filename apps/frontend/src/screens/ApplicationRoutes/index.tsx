import { useUserData } from "@hooks/use-user-data";
import { useUserVerify } from "@hooks/use-user-validate";
import { EditProfilePage } from "@screens/EditProfilePage";
import { HomePage } from "@screens/HomePage";
import { MarketPage } from "@screens/MarketPage";
import { ProfilePage } from "@screens/ProfilePage";
import { RatingPage } from "@screens/RatingPage";
import { SignInPage } from "@screens/SignInPage";
import { SignUpPage } from "@screens/SignUpPage";
import { WelcomePage } from "@screens/WelcomePage";
import { ProtectedRoute } from "@wrappers/ProtectedRoute";
import { FC } from "react";
import { Routes, Route } from "react-router";

export const ApplicationRoutes: FC = () => {
  const { isSuccess: isAuthenticated } = useUserVerify();
  const { isSuccess: isUserDataFetched } = useUserData(isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={isUserDataFetched ? <HomePage /> : <WelcomePage />}
      />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="profile">
          <Route path="" element={<ProfilePage />} />
          <Route path="edit" element={<EditProfilePage />} />
        </Route>
      </Route>
      <Route path="rating/:page?" element={<RatingPage />} />
      <Route path="market/:page?" element={<MarketPage />} />
    </Routes>
  );
};
