import { authApi } from "../../api/AuthApi";
import { PermissionRequest } from "../../types/PermissionRequest";
import { PermissionContext } from "./PermissionContext";

export const PermissionProvider = ({ children }: { children: JSX.Element }) => {
  const api = authApi();

  const createPermission = async (request: PermissionRequest) => {
    return await api.createPermission(request);
  };

  const getAllPermission = async (page: number, size: number, permission: string, description: string) => {
    return await api.getAllPermission(page, size, permission, description);
  };

  const deletePermissionById = async (id: string) => {
    return await api.deletePermission(id);
  };

  const getPermissionById = async (id: string) => {
    return await api.getPermission(id);
  };

  const updatePermissionById = async (id: string, request: PermissionRequest) => {
    return await api.updatePermission(id, request);
  };

  return (
    <PermissionContext.Provider value={{createPermission, getAllPermission, deletePermissionById, getPermissionById, updatePermissionById}}>
      {children}
    </PermissionContext.Provider>
  );
};
