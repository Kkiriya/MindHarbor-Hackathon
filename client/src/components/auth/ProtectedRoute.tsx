import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  element: ReactElement;
};

export default function ProtectedRoute({ element }: Props) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/personal-dashboard" replace />;
  }

  return element;
}
