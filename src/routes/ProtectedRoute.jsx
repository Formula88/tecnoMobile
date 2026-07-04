import { useContext } from "react";
import { Navigate , Outlet } from "react-router-dom";
import {Context} from "../context/AppContext"

function ProtectedRoute() {
    const {isLogin} = useContext(Context)

    return isLogin ? <Outlet/> : <Navigate to={"/Auth"} replace/>
}

export default ProtectedRoute