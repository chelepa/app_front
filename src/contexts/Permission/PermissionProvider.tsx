import { authApi } from "../../api/AuthApi";
import { PermissionRequest } from "../../types/PermissionRequest";
import { PermissionContext } from "./PermissionContext";

export const PermissionProvider = ({ children }: { children: JSX.Element }) => {
  const api = authApi();

  const createPermission = async (request: PermissionRequest) => {
    return true;
  };

  const getAllPermission = async () => {
    return await api.getAllPermission();
  };

  return (
    <PermissionContext.Provider value={{createPermission, getAllPermission}}>
      {children}
    </PermissionContext.Provider>
  );
};
