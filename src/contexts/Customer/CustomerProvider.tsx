import { authApi } from "../../api/AuthApi";
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

    return (
        <CustomerContext.Provider value={{getAllCustomer, getAllGroupPermission, getCustomerById}}>
          {children}
        </CustomerContext.Provider>
    );
};