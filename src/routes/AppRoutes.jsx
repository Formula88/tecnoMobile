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
import Users from "../Admin/pages/Users/Users";
import UsersEdit from "../Admin/pages/Users/UsersEdit/UsersEdit";
import Brands from "../Admin/pages/Brands/Brands";
import AddBrands from "../Admin/pages/Brands/AddBrands/AddBrands";
import EditBrands from "../Admin/pages/Brands/EditBrands/EditBrands";
import VpnClients from "../Admin/pages/VpnClients/VpnClients";
import AddVpnClients from "../Admin/pages/VpnClients/AddVpnClients/AddVpnClients";
import EditVpnClients from "../Admin/pages/VpnClients/EditVpnClients/EditVpnClients";
import Mobile from "../Admin/pages/products/Mobile/Mobile";
import AddMobile from "../Admin/pages/products/Mobile/AddMobile/AddMobile";
import EditMobile from "../Admin/pages/products/Mobile/EditMobile/EditMobile";
import Hardware from "../Admin/pages/products/Hardware/Hardware";
import AddHardware from "../Admin/pages/products/Hardware/AddHardware/AddHardware";
import EditHardware from "../Admin/pages/products/Hardware/EditHardware/EditHardware";
import Accessories from "../Admin/pages/products/Accessories/accessories";
import AddAccessories from "../Admin/pages/products/Accessories/AddAccessories/AddAccessories";
import EditAccessories from "../Admin/pages/products/Accessories/EditAccessories/EditAccessories";
import Accessoriesmodel from "../Admin/pages/products/Accessoriesmodel/Accessoriesmodel";
import AddAccessoriesmodel from "../Admin/pages/products/Accessoriesmodel/AddAccessoriesmodel/AddAccessoriesmodel";
import EditAccessoriesmodel from "../Admin/pages/products/Accessoriesmodel/EditAccessoriesmodel/EditAccessoriesmodel";
import VpnPlan from "../Admin/pages/VpnPlan/VpnPlan";
import AddVpnPlan from "../Admin/pages/VpnPlan/AddVpnPlan/AddVpnPlan";
import EditVpnPlan from "../Admin/pages/VpnPlan/EditVpnPlan/EditVpnPlan";
import ServicesA from "../Admin/pages/ServicesA/ServicesA";
import AddServices from "../Admin/pages/ServicesA/AddServices/AddServices";
import EditServices from "../Admin/pages/ServicesA/EditServices/EditServices";
import ServiceReservation from "../Admin/pages/ServiceReservation/ServiceReservation";
import VPNOrders from "../Admin/pages/VPNOrders/VPNOrders";
import SetVPNOrders from "../Admin/pages/VPNOrders/SetVPNOrders/SetVPNOrders";
import OrdersA from "../Admin/pages/products/OrdersA/OrdersA";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound/NotFound";

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
        <Route path="/ShoppingCart" element={<ShoppingCart />} />

        <Route element={<GuestRoute />}>
          <Route path="/Auth" element={<Auth />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/VPNServices" element={<VPNServices />} />{" "}
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
          <Route path="/admin/vpnClients/edit" element={<EditVpnClients />} />

          <Route path="/admin/products/mobile" element={<Mobile />} />
          <Route path="/admin/products/mobile/add" element={<AddMobile />} />
          <Route path="/admin/products/mobile/edit" element={<EditMobile />} />

          <Route path="/admin/products/hardware" element={<Hardware />} />
          <Route
            path="/admin/products/hardware/add"
            element={<AddHardware />}
          />
          <Route
            path="/admin/products/hardware/edit/:id"
            element={<EditHardware />}
          />

          <Route path="/admin/products/accessories" element={<Accessories />} />
          <Route
            path="/admin/products/accessories/add"
            element={<AddAccessories />}
          />
          <Route
            path="/admin/products/accessories/edit/:id"
            element={<EditAccessories />}
          />

          <Route
            path="/admin/products/accessoriesmodel"
            element={<Accessoriesmodel />}
          />
          <Route
            path="/admin/products/accessoriesmodel/add"
            element={<AddAccessoriesmodel />}
          />
          <Route
            path="/admin/products/accessoriesmodel/edit/:id"
            element={<EditAccessoriesmodel />}
          />

          <Route path="/admin/vpn" element={<VpnPlan />} />
          <Route path="/admin/vpn/add" element={<AddVpnPlan />} />
          <Route path="/admin/vpn/edit" element={<EditVpnPlan />} />

          <Route path="/admin/services/" element={<ServicesA />} />
          <Route path="/admin/services/add" element={<AddServices />} />
          <Route path="/admin/services/edit" element={<EditServices />} />

          <Route
            path="/admin/ServiceReservation"
            element={<ServiceReservation />}
          />

          <Route path="/admin/VPNOrders" element={<VPNOrders />} />
          <Route path="/admin/VPNOrders/set" element={<SetVPNOrders />} />
          
          <Route path="/admin/products/orders" element={<OrdersA />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {isLoading ? <Loading /> : setScrollEnabled(true)}
    </>
  );
}

export default AppRoutes;
