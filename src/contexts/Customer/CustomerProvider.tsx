import { authApi } from "../../api/AuthApi";
import { CustomerContext } from "./CustomerContext";

export const CustomerProvider = ({ children }: { children: JSX.Element }) => {
    const api = authApi();

    const getAllCustomer = async (page: number, size: number, name: string, lastName: string, email: string) => {
        return await api.getAllCustomer(page, size, name, lastName, email);
    }

    return (
        <CustomerContext.Provider value={{getAllCustomer}}>
          {children}
        </CustomerContext.Provider>
    );
};