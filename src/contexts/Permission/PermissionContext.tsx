import { createContext } from "react";
import { PermissionResponse, TPermissionList } from "../../types/PermissionResponse";
import { PermissionRequest } from "../../types/PermissionRequest";

export type PermissionContext = {
    createPermission: (request: PermissionRequest) => Promise<PermissionResponse>;
    getAllPermission: () => Promise<PermissionResponse>;
    
};

export const PermissionContext = createContext<PermissionContext>(null!);
