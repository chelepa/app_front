import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Login } from "../../components/pages/Login";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);

    if (auth.verifyIfTokenIsExpired()) {
        return <Login />;
    }

    return children;
}