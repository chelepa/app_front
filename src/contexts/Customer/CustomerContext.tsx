import { createContext } from "react";
import { CustomerResponse } from "../../types/Customer";
import { AxiosResponse } from "axios";

export type CustomerContext = {
    getAllCustomer: (page: number, size: number, name: string, lastName: string, email: string) => Promise<AxiosResponse<CustomerResponse>>;
};

export const CustomerContext = createContext<CustomerContext>(null!);