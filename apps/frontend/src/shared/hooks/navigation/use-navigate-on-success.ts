import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useNavigateOnSuccess = (action: boolean, endpoint: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (action) {
      navigate(endpoint);
    }
  }, [action, navigate, endpoint]);
};
