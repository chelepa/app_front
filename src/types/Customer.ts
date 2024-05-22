import { GroupPermission } from "./Group";

export type CustomerResponse = {
    page: number;
    size: number;
    totalPages: number;
    totalItem: number;
    customer: any;
}

export type CustomerDTO = {
    id: String;
    name: String;
    email: String;
    last_name: String;
    cell: String;
    password: String;
    group: GroupPermission[];
}