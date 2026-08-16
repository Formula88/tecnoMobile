import { useContext } from "react";
import { Context } from "../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";

function AdminRoute() {
  const { isLogin, userType } = useContext(Context);

  return isLogin && userType == "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={<NotFound />} replace />
  );
}

export default AdminRoute;
