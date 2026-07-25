import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import Home from "../pages/Home/Home";
import VPNs from "../pages/VPNs/VPNs";
import Product from "../pages/Product/Product";
import Services from "../pages/Services/Services";
import Products from "../pages/Products/Products";
import AboutUs from "../pages/AboutUs/AboutUs";
import Auth from "../pages/Auth/Auth";
import Profile from "../pages/Profile/Profile";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import Loading from "../components/layout/Loading/Loading";
import { Context } from "../context/AppContext";
import VPNServices from "../pages/VPNServices/VPNServices";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import Repairorders from "../pages/Repairorders/Repairorders";
import Orders from "../pages/Orders/Orders";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import ReceiverInfo from "../pages/ReceiverInfo/ReceiverInfo";
import Panel from "../Admin/pages/Panel/Panel";

function AppRoutes() {
  const { isLoading, setScrollEnabled } = useContext(Context);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VPN" element={<VPNs />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/AboutUs" element={<AboutUs />} />

        <Route element={<GuestRoute />}>
          <Route path="/Auth" element={<Auth />} />
        </Route>
        <Route element={<ProtectedRoute />}></Route>

        <Route path="/profile" element={<Profile />} />
        <Route path="/VPNServices" element={<VPNServices />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/Repairorders" element={<Repairorders />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/OrderDetails" element={<OrderDetails />} />
        <Route path="/checkout" element={<ReceiverInfo />} />

        <Route path="/admin/panel" element={<Panel />} />
      </Routes>

      {isLoading ? <Loading /> : setScrollEnabled(true)}
    </>
  );
}

export default AppRoutes;
