export type PermissionResponse = {
    page: number;
    size: number;
    totalPages: number;
    totalItem: number;
    permission: any;
}

export type Permission = {
    id: number,
    permission: string,
    description: string
}

export type TPermissionList = Permission[]