import { Route, Routes } from "react-router-dom";
import { HomePermissionGroup } from "../pages/PermissionGroup/HomePermissionGroup";

export const RoutePermissionGroup = () => {
  return (
    <Routes>
      <Route path="/group" element={<HomePermissionGroup />} />
      {/* <Route path="/group/create" element={<PermissionCreate />} />
      <Route path="/group/:id" element={<PermissionViewUpdate />} /> */}
    </Routes>
  );
};
