import { createContext } from "react";
import { PermissionResponse, TPermissionList } from "../../types/PermissionResponse";
import { PermissionRequest } from "../../types/PermissionRequest";

export type PermissionContext = {
    permissionList: TPermissionList;
    createPermission: (request: PermissionRequest) => Promise<boolean>;
    getAllPermission: () => Promise<TPermissionList>;
};

export const PermissionContext = createContext<PermissionContext>(null!);
