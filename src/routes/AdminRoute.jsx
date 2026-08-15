import { useContext } from "react";
import { Context } from "../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const { isLogin, userType } = useContext(Context);

  return isLogin && userType == "admin" ? (
<Outlet />
  ) : (
    <Navigate to={""} replace />
  );
}

export default AdminRoute;
