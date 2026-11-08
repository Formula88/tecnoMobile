import { useContext } from "react";
import { Context } from "../context/AppContext";
import { Outlet } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import Loading from "../components/layout/Loading/Loading";

function AdminRoute() {
  const { isLogin, userType, isAuthChecking } = useContext(Context);

  if (isAuthChecking) {
    return <Loading />;
  }

  return isLogin && userType === "admin" ? <Outlet /> : <NotFound />;
}

export default AdminRoute;
