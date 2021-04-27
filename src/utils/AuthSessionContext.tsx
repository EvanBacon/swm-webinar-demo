import * as React from 'react';
import * as AuthSession from 'expo-auth-session';

import { useSecureAuthState } from './useSecureAuthState';
import { UseStateHook } from './utils';

export function createTokenResponseContextProvider(key: string): [
    ({ children, }: {
        children?: React.ReactNode;
    }) => JSX.Element,
    () => UseStateHook<AuthSession.TokenResponse>
] {
    const TokenResponseContext = React.createContext<UseStateHook<AuthSession.TokenResponse> | null>(null);

    TokenResponseContext.displayName = `TokenResponseContext_${key}`;

    function TokenResponseProvider({
        children,
    }: {
        children?: React.ReactNode;
    }) {
        const value = useSecureAuthState(key)
        return (<TokenResponseContext.Provider value={value}>{children}</TokenResponseContext.Provider>);
    }
    function useTokenResponse(): UseStateHook<AuthSession.TokenResponse> {
        const storage = React.useContext(TokenResponseContext);
        if (storage == null) {
            throw new Error(
                `No auth value available for key "${key}". Make sure you are rendering \`<TokenResponseProvider>\` at the top of your app.`,
            );
        }
        return storage;
    }
    return [TokenResponseProvider, useTokenResponse]
}
