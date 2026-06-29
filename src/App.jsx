import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import VPNs from "./pages/VPNs/VPNs";
import Product from "./pages/Product/Product";
import Services from "./pages/Services/Services";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VPN" element={<VPNs />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
