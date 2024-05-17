import { PermissionDTO } from "./PermissionResponse";

export type GroupPermissionResponse = {
    page: number;
    size: number;
    totalPages: number;
    totalItem: number;
    group: any;
}

export type GroupPermission = {
    id: number;
    name: string;
    description: string;
    permission: PermissionDTO[];
}

export type GroupPermissionRequest = {
    name: string;
    description: string;
    permissionId: Number[];
}