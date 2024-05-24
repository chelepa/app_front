import { GroupPermission } from "./Group";

export type CustomerResponse = {
    page: number;
    size: number;
    totalPages: number;
    totalItem: number;
    customer: any;
}

export type CustomerDTO = {
    id: number;
    name: string;
    email: string;
    last_name: string;
    cell: string;
    password: string;
    group: GroupPermission[];
}

export type CustomerRequest = {
    id: number;
    name: string;
    email: string;
    last_name: string;
    cell: string;
    password: null | string;
    group: number[];
}

export type PasswordRequest = {
    password: string;
    checkPassword: string;
}