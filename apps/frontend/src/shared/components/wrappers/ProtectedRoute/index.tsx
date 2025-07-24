import { useAppSelector } from "@hooks/core/redux";
import { LoadingWheel } from "@overlays/LoadingWheel";
import { userSelector } from "@selectors/userSelector";
import { FC } from "react";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute: FC = () => {
  const { authLoading, isAuthenticated } = useAppSelector(userSelector);

  if (authLoading) {
    return <LoadingWheel />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};
