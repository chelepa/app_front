import { authApi } from "../../api/AuthApi";
import { GroupPermissionRequest } from "../../types/Group";
import { PermissionGroupContext } from "./PermissionGroupContext";

export const PermissionGroupProvider = ({ children }: { children: JSX.Element }) => {
  const api = authApi();

  const getAllGroupPermission = async (page: number, size: number, name: string, description: string) => {
    return await api.getAllGroupPermission(page, size, name, description);
  };

  const getGroupPermissionById = async (id: number) => {
    return await api.getGroupPermissionbyId(id);
  };

  const getAllPermission = async (page: number, size: number, permission: string, description: string) => {
    return await api.getAllPermission(page, size, permission, description);
  };

  const updateGroupPermission = async (id: number, request: GroupPermissionRequest) => {
    return await api.updateGroupPermissionbyId(id, request);
  };

  const deleteGroupPermissionById = async (id: number) => {
    return await api.deleteGroupPermissionbyId(id);
  };

  const createGroupPermission = async (groupPermissionRequest: GroupPermissionRequest) => {
    return await api.createGroupPermission(groupPermissionRequest);
  };

  return (
    <PermissionGroupContext.Provider value={{getAllGroupPermission, getGroupPermissionById, getAllPermission, updateGroupPermission, deleteGroupPermissionById, createGroupPermission}}>
      {children}
    </PermissionGroupContext.Provider>
  );
};
