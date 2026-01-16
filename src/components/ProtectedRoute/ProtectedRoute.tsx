import { useAppSelector } from "@/hooks";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const logged = useAppSelector((state) => state.auth.logged);

  if (!logged) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
