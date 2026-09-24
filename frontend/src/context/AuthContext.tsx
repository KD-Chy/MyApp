// Context in react, a central mechanism for maintaining global authentication data 
// without many components without parsing props through every component

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { 
    AuthUser,
    LoginResponse 
}from "../types/auth";

import {
    clearAuthStorage,
    getAccessToken,
    getAuthUser,
    saveAuth,
} from "../services/authStorage";

interface AuthContextType {
    user: AuthUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    loginUser: (
        response: LoginResponse,
        rememberMe: boolean
    ) => void;

    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [accessToken, setAccessToken] =
        useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = getAccessToken();
        const storedUser = getAuthUser();

        if (storedToken && storedUser) {
            setAccessToken(storedToken);
            setUser(storedUser);
        }

        setIsLoading(false);
    }, []);

    const loginUser = (
        response: LoginResponse,
        rememberMe: boolean
    ) => {
        saveAuth(response, rememberMe);

        setAccessToken(response.access);

        setUser({
            username: response.username,
            first_name: response.first_name,
            last_name: response.last_name,
            role: response.role,
        });
    };

    const logout = () => {
        clearAuthStorage();

        setAccessToken(null);
        setUser(null);
    };

    const isAuthenticated =
        Boolean(accessToken && user);

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated,
                isLoading,
                loginUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider"
        );
    }

    return context;
}