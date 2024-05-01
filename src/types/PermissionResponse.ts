export type PermissionResponse = {
    page: number;
    size: number;
    totalPages: number;
    totalItem: number;
    permission: any;
}

export type PermissionDTO = {
    id: number,
    permission: string,
    description: string
}

export type TPermissionList = PermissionDTO[]