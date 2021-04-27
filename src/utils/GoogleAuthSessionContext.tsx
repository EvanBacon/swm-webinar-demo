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
    config: Partial<GoogleAuthRequestConfig>;
    prompt: [
        AuthSession.AuthRequest | null,
        AuthSession.AuthSessionResult | null,
        (
            options?: AuthSession.AuthRequestPromptOptions
        ) => Promise<AuthSession.AuthSessionResult>
    ];
} | null>(null);

GoogleAuthSessionContext.displayName = `TokenResponseContext_${key}`;

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
    const useRequest = React.useMemo(() => isIdToken ? useIdTokenAuthRequest : useAuthRequest, [isIdToken]);
    const prompt = useRequest(config, redirectUriOptions);

    return (
        <TokenResponseContext>
            <GoogleAuthSessionContext.Provider value={{ config, prompt }}>
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
    return auth.prompt;
}

export function useSignIn() {
    const auth = useAuthSessionContext();
    const [, setToken] = useTokenResponse();
    const [request, response, promptAsync] = auth.prompt;

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
    const auth = useAuthSessionContext();

    const [, setToken] = useTokenResponse();

    const [token] = useTokenResponse();

    return React.useCallback(async () => {
        if (!token.value?.accessToken) {
            return null;
        }
        const success = await AuthSession.revokeAsync(
            { ...auth.config, token: token.value!.accessToken },
            discovery
        );
        if (success) {
            setToken(null);
        }
        return success;
    }, [token.value?.accessToken, setToken]);
}

export function useRefresh() {
    const auth = useAuthSessionContext();
    const [token, setToken] = useTokenResponse();

    return React.useCallback(async () => {
        if (!token.value?.accessToken) {
            return null;
        }

        const refreshed = await token.value.refreshAsync(
            {
                ...auth.config,
                clientId: auth.config.clientId!,
            },
            discovery
        );

        setToken(refreshed);

        return refreshed;
    }, [setToken, token.value?.accessToken, auth.config]);
}

export function useUserInfo() {
    const [auth] = useTokenResponse();
    if (auth == null) {
        throw new Error(
            `No auth value available. Make sure you are rendering \`<GoogleAuthSessionProvider>\` at the top of your app.`
        );
    }
    return useGoogleUserProfile(auth.value?.accessToken);
}
