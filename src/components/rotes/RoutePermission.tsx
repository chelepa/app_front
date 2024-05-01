import { Route } from "react-router-dom";
import { Permission } from "../pages/Permission/Permission";
import { PermissionCreate } from "../pages/Permission/PermissionCreate";
import { Routes } from "react-router-dom";
import { PermissionViewUpdate } from "../pages/Permission/PermissionViewUpdate";

export const RoutePermission = () => {
  return (
    <Routes>
      <Route path="/permission" element={<Permission />} />
      <Route path="/permission/create" element={<PermissionCreate />} />
      <Route path="/permission/:id" element={<PermissionViewUpdate />} />
    </Routes>
  );
};
