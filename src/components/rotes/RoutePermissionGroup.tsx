import { Route, Routes } from "react-router-dom";
import { HomePermissionGroup } from "../pages/PermissionGroup/HomePermissionGroup";
import { UpdatePermissionGroup } from "../pages/PermissionGroup/UpdatePermissionGroup";

export const RoutePermissionGroup = () => {
  return (
    <Routes>
      <Route path="/group" element={<HomePermissionGroup />} />
      <Route path="/group/:id" element={<UpdatePermissionGroup />} />
      {/* <Route path="/group/create" element={<PermissionCreate />} /> */}
    </Routes>
  );
};
