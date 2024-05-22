import { Route, Routes } from "react-router-dom";
import { HomeCustomer } from "../pages/Customer/HomeCustomer";
import { UpdateCustomer } from "../pages/Customer/UpdateCustomer";
import { CreateCustomer } from "../pages/Customer/CreateCustomer";

export const RouteCustomer = () => {
  return (
    <Routes>
      <Route path="/customer" element={<HomeCustomer />} />
      <Route path="/customer/:id" element={<UpdateCustomer />} />
      <Route path="/customer/create" element={<CreateCustomer />} />
    </Routes>
  );
};