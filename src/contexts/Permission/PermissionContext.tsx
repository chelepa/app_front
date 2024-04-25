import { createContext } from "react";
import { PermissionDTO, PermissionResponse } from "../../types/PermissionResponse";
import { PermissionRequest } from "../../types/PermissionRequest";
import { AxiosResponse } from "axios";

export type PermissionContext = {
    createPermission: (request: PermissionRequest) => Promise<PermissionResponse>;
    getAllPermission: (page: number, size: number, permission: string, description: string) => Promise<PermissionResponse>;
    getPermissionById: (id: string) => Promise<AxiosResponse<PermissionDTO>>;
    deletePermissionById: (id: string) => void;
    
};

export const PermissionContext = createContext<PermissionContext>(null!);
