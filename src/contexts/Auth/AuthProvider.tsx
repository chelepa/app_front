import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { ITokenClaims } from "../../types/ITokenClaims";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<ITokenClaims | null>(null);
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = getClaims();
            if (storageData) {
              setUser(storageData)
            }
        }
        validateToken();
    }, []);


    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if(data.auth){
            setToken(data.token);
            const claims = getClaims();
            if(claims){
                setUser(claims)
            }
            return true;
        }
        return false;
    }

    const signout = async () => {
        // await api.logout();
        setUser(null);
        removeToken();
    }

    const getRoles = () => {
      const claims = getClaims();
      if (claims) {
        return claims.Roles.split(",");
      }
      return [];
    };

    return (
        <AuthContext.Provider value={{user, signin, signout, getRoles}}>
            {children}
        </AuthContext.Provider>
    );
}

function getClaims(): ITokenClaims | undefined {
    const token = getToken();
    if (token) {
        var claims: ITokenClaims = jwtDecode(token);
        if (claims && isTokenValid(claims)) {
            return claims;
        } else {
            removeToken();
        }
    }
    return;
}

function isTokenValid(claims: ITokenClaims): boolean {
  return claims.exp * 1000 > Date.now();
}

function getToken(): string | undefined {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    return token;
  }
  return;
}

function setToken(token: string) {
  window.localStorage.setItem("authToken", token);
}

function removeToken() {
  window.localStorage.removeItem("authToken");
}
