import { createContext } from "react";
import { TPermissionList } from "../../types/PermissionResponse";
import { PermissionRequest } from "../../types/PermissionRequest";

export type PermissionContext = {
    createPermission: (request: PermissionRequest) => Promise<boolean>;
    getAllPermission: () => Promise<TPermissionList>;
};

export const PermissionContext = createContext<PermissionContext>(null!);
