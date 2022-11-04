import { createContext, ReactNode, useState, useEffect } from "react";
import { } from 'react-native-dotenv';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [user, setUser] = useState<UserProps>({} as UserProps);

    const [req, res, promptAsync] = Google.useAuthRequest({
        clientId: '',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    async function signIn() {
        try {
            setIsUserLoading(true);
            await promptAsync();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle(access_token: string) {
        console.log('TOKEN DE AUTENTICAÇÃO ==>>', access_token)
    }

    useEffect(() => {
        if (res?.type === 'success' && res.authentication?.accessToken) {
            signInWithGoogle(res.authentication.accessToken);
        }
    }, [res])

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}