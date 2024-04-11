import {createContext} from 'react' 
import { ITokenClaims } from '../../types/ITokenClaims';

export type AuthContextType = {
    user: ITokenClaims | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    getRoles: () => string[];
    hasPermission: (roles: string[]) => boolean;

}

export const AuthContext = createContext<AuthContextType>(null!);