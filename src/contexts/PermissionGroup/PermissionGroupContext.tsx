import { AxiosResponse } from "axios";
import { createContext } from "react";
import { GroupPermissionResponse } from "../../types/Group";

export type PermissionGroupContext = {
    getAllGroupPermission: (page: number, size: number, name: string, description: string) => Promise<AxiosResponse<GroupPermissionResponse>>;
};

export const PermissionGroupContext = createContext<PermissionGroupContext>(null!);