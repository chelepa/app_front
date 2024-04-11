import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { authApi } from "../../api/AuthApi"
import { ITokenClaims } from "../../types/ITokenClaims";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<ITokenClaims | null>(null);
    const api = authApi();

    useEffect(() => {
      const validateToken = async () => {
        const storageData = getClaims();
        if (storageData) {
          setUser(storageData);
        } else{
          setUser(null);
        }
      };
      validateToken();
    }, []);

    const signin = async (email: string, password: string) => {
      const data = await api.signin(email, password);
      if (data.auth) {
        setToken(data.token);
        const claims = getClaims();
        if (claims) {
          setUser(claims);
        }
        return true;
      }
      return false;
    };

    const signout = async () => {
      setUser(null);
      removeToken();
    };

    const verifyIfTokenIsExpired = () => {
      const token = getToken();
      if (token) {
        var claims: ITokenClaims = jwtDecode(token);
        return isTokenValid(claims) ? false : true;
      } else {
        return true;
      }
    };

    const hasPermission = (roles: string[]) => {
      const authorizations = getRoles();
      if (authorizations) {
        return roles.some((role) => authorizations.includes(role));
      }
      return false;
    };

    return (
        <AuthContext.Provider value={{user, signin, signout, hasPermission, verifyIfTokenIsExpired}}>
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

function getRoles(): string[] {
  const claims = getClaims();
  if (claims) {
    return claims.Roles.split(",");
  }
  return [];
};

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
