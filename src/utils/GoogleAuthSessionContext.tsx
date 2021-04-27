import * as AuthSession from 'expo-auth-session';
import {
    discovery,
    GoogleAuthRequestConfig,
    useAuthRequest,
    useIdTokenAuthRequest,
} from 'expo-auth-session/providers/google';
import * as React from 'react';

import { useGoogleUserProfile } from './API';
import { createTokenResponseContextProvider } from './TokenResponseContext';

const key = "AuthSession_Google";

const [
    TokenResponseContext,
    useTokenResponse,
] = createTokenResponseContextProvider(key);

const GoogleAuthSessionContext = React.createContext<{
    useRequest: () => [
        AuthSession.AuthRequest | null,
        AuthSession.AuthSessionResult | null,
        (options?: AuthSession.AuthRequestPromptOptions | undefined) => Promise<AuthSession.AuthSessionResult>
    ],
    config: Partial<GoogleAuthRequestConfig>;
} | null>(null);

GoogleAuthSessionContext.displayName = `GoogleAuthSessionContext`;

export function GoogleAuthSessionProvider({
    children,
    config,
    isIdToken,
    redirectUriOptions,
}: {
    children?: React.ReactNode;
    config: Partial<GoogleAuthRequestConfig>;
    isIdToken?: boolean;
    redirectUriOptions?: Partial<AuthSession.AuthSessionRedirectUriOptions>;
}) {
    const useRequest = React.useCallback(() => {
        const useRequest = isIdToken ? useIdTokenAuthRequest : useAuthRequest;
        return useRequest(config, redirectUriOptions);
    }, [isIdToken, config, redirectUriOptions]);

    return (
        <TokenResponseContext>
            <GoogleAuthSessionContext.Provider value={{ useRequest, config }}>
                {children}
            </GoogleAuthSessionContext.Provider>
        </TokenResponseContext>
    );
}

export { useTokenResponse };

function useAuthSessionContext() {
    const auth = React.useContext(GoogleAuthSessionContext);
    if (auth == null) {
        throw new Error(
            `No auth value available. Make sure you are rendering \`<GoogleAuthSessionProvider>\` at the top of your app.`
        );
    }
    return auth;
}

export function useAuthSession() {
    const auth = useAuthSessionContext();
    return auth.useRequest();
}

export function useSignIn() {
    const [, setToken] = useTokenResponse();
    const [request, response, promptAsync] = useAuthSession();

    React.useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;
            if (authentication) {
                setToken(authentication);
            }
        }
    }, [response]);

    return request ? promptAsync : null;
}

export function useSignOut() {
    const { config } = useAuthSessionContext();
    const [token, setToken] = useTokenResponse();

    return React.useCallback(async () => {
        if (!token.value?.accessToken) {
            return null;
        }
        const success = await AuthSession.revokeAsync(
            { ...config, token: token.value!.accessToken },
            discovery
        );
        if (success) {
            setToken(null);
        }
        return success;
    }, [setToken, token.value?.accessToken, config]);
}

export function useRefresh() {
    const { config } = useAuthSessionContext();
    const [token, setToken] = useTokenResponse();

    return React.useCallback(async () => {
        if (!token.value?.accessToken) {
            return null;
        }
        const refreshed = await token.value.refreshAsync(
            {
                ...config,
                clientId: config.clientId!,
            },
            discovery
        );

        setToken(refreshed);

        return refreshed;
    }, [setToken, token.value?.accessToken, config]);
}

export function useUserInfo() {
    const [auth] = useTokenResponse();
    return useGoogleUserProfile(auth.value?.accessToken);
}
