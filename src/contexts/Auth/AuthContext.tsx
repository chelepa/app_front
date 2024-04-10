import {createContext} from 'react' 
import { User } from '../../types/User';
import { ITokenClaims } from '../../types/ITokenClaims';

export type AuthContextType = {
    user: ITokenClaims | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    getRoles: () => string[];

}

export const AuthContext = createContext<AuthContextType>(null!);