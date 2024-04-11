import { createContext } from "react";
import { ITokenClaims } from "../../types/ITokenClaims";

export type AuthContextType = {
  user: ITokenClaims | null;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
  hasPermission: (roles: string[]) => boolean;
  verifyIfTokenIsExpired: () => boolean;
};

export const AuthContext = createContext<AuthContextType>(null!);
