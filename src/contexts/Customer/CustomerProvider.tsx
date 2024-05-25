import { authApi } from "../../api/AuthApi";
import { CustomerRequest } from "../../types/Customer";
import { CustomerContext } from "./CustomerContext";

export const CustomerProvider = ({ children }: { children: JSX.Element }) => {
    const api = authApi();

    const getAllGroupPermission = async (page: number, size: number, name: string, description: string) => {
        return await api.getAllGroupPermission(page, size, name, description);
    };

    const getCustomerById = async (id: string) => {
        return await api.getCustomerById(id);
    };

    const getAllCustomer = async (page: number, size: number, name: string, lastName: string, email: string) => {
        return await api.getAllCustomer(page, size, name, lastName, email);
    }

    const updateCustomerById = async (id: string, request: CustomerRequest) => {
        return await api.updateCustomerById(id, request);
    }

    const deleteCustomerById = async (id: number) => {
        return await api.deleteCustomerById(id);
    }

    return (
        <CustomerContext.Provider value={{getAllCustomer, getAllGroupPermission, getCustomerById, updateCustomerById, deleteCustomerById}}>
          {children}
        </CustomerContext.Provider>
    );
};