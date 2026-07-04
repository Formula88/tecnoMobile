import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../context/AppContext";

function GuestRoute() {
  const { isLogin } = useContext(Context);

  return !isLogin ? <Outlet /> : <Navigate to={"/"} replace />;
}

export default GuestRoute;
