import { authApi } from "../../api/AuthApi";
import { PermissionGroupContext } from "./PermissionGroupContext";

export const PermissionGroupProvider = ({ children }: { children: JSX.Element }) => {
  const api = authApi();

  const getAllGroupPermission = async (page: number, size: number, name: string, description: string) => {
    return await api.getAllGroupPermission(page, size, name, description);
  };

  return (
    <PermissionGroupContext.Provider value={{getAllGroupPermission}}>
      {children}
    </PermissionGroupContext.Provider>
  );
};
