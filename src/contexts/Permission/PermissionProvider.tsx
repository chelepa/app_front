import { useEffect, useState } from "react";
import { authApi } from "../../api/AuthApi";
import { PermissionRequest } from "../../types/PermissionRequest";
import { PermissionContext } from "./PermissionContext";
import { TPermissionList } from "../../types/PermissionResponse";

export const PermissionProvider = ({ children }: { children: JSX.Element }) => {
  const api = authApi();
  const [permissionList, setPermissionList] = useState<TPermissionList>([]);

  useEffect(() => {
    getAllPermission();
  }, []);

  const createPermission = async (request: PermissionRequest) => {
    return true;
  };

  const getAllPermission = async () => {
    const data = await api.getAllPermission();
    setPermissionList(data);
    return data;
  };

  return (
    <PermissionContext.Provider value={{permissionList, createPermission, getAllPermission}}>
      {children}
    </PermissionContext.Provider>
  );
};
