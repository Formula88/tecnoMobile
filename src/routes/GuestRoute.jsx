import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../context/AppContext";
import { FullPageSkeleton } from "../components/ui/Skeleton/Skeleton";

function GuestRoute() {
  const { isLogin, isAuthChecking } = useContext(Context);

  if (isAuthChecking) {
    return <FullPageSkeleton />;
  }

  return !isLogin ? <Outlet /> : <Navigate to="/" replace />;
}

export default GuestRoute;
