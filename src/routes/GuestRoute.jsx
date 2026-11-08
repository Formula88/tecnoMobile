import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../context/AppContext";
import Loading from "../components/layout/Loading/Loading";

function GuestRoute() {
  const { isLogin, isAuthChecking } = useContext(Context);

  if (isAuthChecking) {
    return <Loading />;
  }

  return !isLogin ? <Outlet /> : <Navigate to="/" replace />;
}

export default GuestRoute;
