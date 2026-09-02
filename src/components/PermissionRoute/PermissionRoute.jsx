import { Navigate, Outlet } from "react-router-dom";

export default function PermissionRoute({ hasPermission }) {

  if (!hasPermission) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}