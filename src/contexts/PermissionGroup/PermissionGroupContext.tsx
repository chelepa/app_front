import { AxiosResponse } from "axios";
import { createContext } from "react";
import { GroupPermission, GroupPermissionRequest, GroupPermissionResponse } from "../../types/Group";
import { PermissionResponse } from "../../types/PermissionResponse";

export type PermissionGroupContext = {
    getAllPermission: (page: number, size: number, permission: string, description: string) => Promise<PermissionResponse>;
    getAllGroupPermission: (page: number, size: number, name: string, description: string) => Promise<AxiosResponse<GroupPermissionResponse>>;
    getGroupPermissionById: (id: number) => Promise<AxiosResponse<GroupPermission>>;
    updateGroupPermission: (id: number, request: GroupPermissionRequest) => Promise<AxiosResponse<GroupPermission>>;
    deleteGroupPermissionById: (id: number) => Promise<AxiosResponse<void>>;
    createGroupPermission: (groupPermissionRequest: GroupPermissionRequest) => Promise<AxiosResponse<PermissionResponse>>;
};

export const PermissionGroupContext = createContext<PermissionGroupContext>(null!);