import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";

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
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound/NotFound";

// Lazy-loaded Admin pages for maximum performance and code splitting
const Panel = lazy(() => import("../Admin/pages/Panel/Panel"));
const Users = lazy(() => import("../Admin/pages/Users/Users"));
const UsersEdit = lazy(() => import("../Admin/pages/Users/UsersEdit/UsersEdit"));
const Brands = lazy(() => import("../Admin/pages/Brands/Brands"));
const AddBrands = lazy(() => import("../Admin/pages/Brands/AddBrands/AddBrands"));
const EditBrands = lazy(() => import("../Admin/pages/Brands/EditBrands/EditBrands"));
const VpnClients = lazy(() => import("../Admin/pages/VpnClients/VpnClients"));
const AddVpnClients = lazy(() => import("../Admin/pages/VpnClients/AddVpnClients/AddVpnClients"));
const EditVpnClients = lazy(() => import("../Admin/pages/VpnClients/EditVpnClients/EditVpnClients"));
const Mobile = lazy(() => import("../Admin/pages/products/Mobile/Mobile"));
const AddMobile = lazy(() => import("../Admin/pages/products/Mobile/AddMobile/AddMobile"));
const EditMobile = lazy(() => import("../Admin/pages/products/Mobile/EditMobile/EditMobile"));
const Hardware = lazy(() => import("../Admin/pages/products/Hardware/Hardware"));
const AddHardware = lazy(() => import("../Admin/pages/products/Hardware/AddHardware/AddHardware"));
const EditHardware = lazy(() => import("../Admin/pages/products/Hardware/EditHardware/EditHardware"));
const Accessories = lazy(() => import("../Admin/pages/products/Accessories/Accessories"));
const AddAccessories = lazy(() => import("../Admin/pages/products/Accessories/AddAccessories/AddAccessories"));
const EditAccessories = lazy(() => import("../Admin/pages/products/Accessories/EditAccessories/EditAccessories"));
const Accessoriesmodel = lazy(() => import("../Admin/pages/products/Accessoriesmodel/Accessoriesmodel"));
const AddAccessoriesmodel = lazy(() => import("../Admin/pages/products/Accessoriesmodel/AddAccessoriesmodel/AddAccessoriesmodel"));
const EditAccessoriesmodel = lazy(() => import("../Admin/pages/products/Accessoriesmodel/EditAccessoriesmodel/EditAccessoriesmodel"));
const VpnPlan = lazy(() => import("../Admin/pages/VpnPlan/VpnPlan"));
const AddVpnPlan = lazy(() => import("../Admin/pages/VpnPlan/AddVpnPlan/AddVpnPlan"));
const EditVpnPlan = lazy(() => import("../Admin/pages/VpnPlan/EditVpnPlan/EditVpnPlan"));
const ServicesA = lazy(() => import("../Admin/pages/ServicesA/ServicesA"));
const AddServices = lazy(() => import("../Admin/pages/ServicesA/AddServices/AddServices"));
const EditServices = lazy(() => import("../Admin/pages/ServicesA/EditServices/EditServices"));
const ServiceReservation = lazy(() => import("../Admin/pages/ServiceReservation/ServiceReservation"));
const VPNOrders = lazy(() => import("../Admin/pages/VPNOrders/VPNOrders"));
const SetVPNOrders = lazy(() => import("../Admin/pages/VPNOrders/SetVPNOrders/SetVPNOrders"));
const OrdersA = lazy(() => import("../Admin/pages/products/OrdersA/OrdersA"));

function AppRoutes() {
  const { isLoading, setScrollEnabled } = useContext(Context);

  useEffect(() => {
    setScrollEnabled(!isLoading);
  }, [isLoading, setScrollEnabled]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/VPN" element={<VPNs />} />
          <Route path="/Product/:id" element={<Product />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />

          <Route element={<GuestRoute />}>
            <Route path="/Auth" element={<Auth />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/VPNServices" element={<VPNServices />} />
            <Route path="/Repairorders" element={<Repairorders />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/OrderDetails" element={<OrderDetails />} />
            <Route path="/checkout" element={<ReceiverInfo />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin/panel" element={<Panel />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/edit/:id" element={<UsersEdit />} />

            <Route path="/admin/brands" element={<Brands />} />
            <Route path="/admin/brands/add" element={<AddBrands />} />
            <Route path="/admin/brands/edit/:id" element={<EditBrands />} />

            <Route path="/admin/vpnClients" element={<VpnClients />} />
            <Route path="/admin/vpnClients/add" element={<AddVpnClients />} />
            <Route path="/admin/vpnClients/edit/:id" element={<EditVpnClients />} />

            <Route path="/admin/products/mobile" element={<Mobile />} />
            <Route path="/admin/products/mobile/add" element={<AddMobile />} />
            <Route path="/admin/products/mobile/edit/:id" element={<EditMobile />} />
            <Route path="/admin/products/mobile/edit" element={<EditMobile />} />

            <Route path="/admin/products/hardware" element={<Hardware />} />
            <Route path="/admin/products/hardware/add" element={<AddHardware />} />
            <Route path="/admin/products/hardware/edit/:id" element={<EditHardware />} />

            <Route path="/admin/products/accessories" element={<Accessories />} />
            <Route path="/admin/products/accessories/add" element={<AddAccessories />} />
            <Route path="/admin/products/accessories/edit/:id" element={<EditAccessories />} />

            <Route path="/admin/products/accessoriesmodel" element={<Accessoriesmodel />} />
            <Route path="/admin/products/accessoriesmodel/add" element={<AddAccessoriesmodel />} />
            <Route path="/admin/products/accessoriesmodel/edit/:id" element={<EditAccessoriesmodel />} />

            <Route path="/admin/vpn" element={<VpnPlan />} />
            <Route path="/admin/vpn/add" element={<AddVpnPlan />} />
            <Route path="/admin/vpn/edit/:id" element={<EditVpnPlan />} />

            <Route path="/admin/services/" element={<ServicesA />} />
            <Route path="/admin/services/add" element={<AddServices />} />
            <Route path="/admin/services/edit/:id" element={<EditServices />} />

            <Route path="/admin/ServiceReservation" element={<ServiceReservation />} />

            <Route path="/admin/VPNOrders" element={<VPNOrders />} />
            <Route path="/admin/VPNOrders/set" element={<SetVPNOrders />} />

            <Route path="/admin/products/orders" element={<OrdersA />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {isLoading && <Loading />}
    </>
  );
}

export default AppRoutes;
