import { createContext } from "react";
import { CustomerDTO, CustomerRequest, CustomerResponse } from "../../types/Customer";
import { AxiosResponse } from "axios";
import { GroupPermissionResponse } from "../../types/Group";

export type CustomerContext = {
    getAllCustomer: (page: number, size: number, name: string, lastName: string, email: string) => Promise<AxiosResponse<CustomerResponse>>;
    getCustomerById: (id: string) => Promise<AxiosResponse<CustomerDTO>>;
    updateCustomerById: (id: string, request: CustomerRequest) => Promise<AxiosResponse<CustomerDTO>>;
    deleteCustomerById: (id: number) => Promise<AxiosResponse<void>>;
    getAllGroupPermission: (page: number, size: number, name: string, description: string) => Promise<AxiosResponse<GroupPermissionResponse>>;
};

export const CustomerContext = createContext<CustomerContext>(null!);