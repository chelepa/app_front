import { createContext } from "react";
import { PermissionResponse } from "../../types/PermissionResponse";
import { PermissionRequest } from "../../types/PermissionRequest";

export type PermissionContext = {
    createPermission: (request: PermissionRequest) => Promise<PermissionResponse>;
    getAllPermission: (page: number, size: number, permission: string, description: string) => Promise<PermissionResponse>;
    deletePermissionById: (id: string) => void;
    
};

export const PermissionContext = createContext<PermissionContext>(null!);
