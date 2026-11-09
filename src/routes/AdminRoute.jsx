import { useContext } from "react";
import { Context } from "../context/AppContext";
import { Outlet } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import { FullPageSkeleton } from "../components/ui/Skeleton/Skeleton";

function AdminRoute() {
  const { isLogin, userType, isAuthChecking } = useContext(Context);

  if (isAuthChecking) {
    return <FullPageSkeleton />;
  }

  return isLogin && userType === "admin" ? <Outlet /> : <NotFound />;
}

export default AdminRoute;
