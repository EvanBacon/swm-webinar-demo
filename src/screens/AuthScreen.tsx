import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

import { useSecureAuthState } from '../utils/useSecureAuthState';

function LogoutButton({
    setAuth,
}: {
    setAuth: (key: AuthSession.TokenResponse | null) => void;
}) {
    return (
        <Button
            title="Log out"
            onPress={React.useCallback(() => setAuth(null), [setAuth])}
        />
    );
}

export default function Login({
    setAuth,
}: {
    setAuth: (key: AuthSession.TokenResponse | null) => void;
}) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId:
            "629683148649-jgilndep5gcjorm03pf9cnibor85khbd",
        clientId:
            "XXX",
        language: 'en'
    });

    React.useEffect(() => {
        console.log("AUTH.changed: ", response?.type);
        if (response?.type === "success") {
            const { authentication } = response;
            if (authentication) {
                setAuth(authentication);
            }
            console.log("AUTH: ", authentication);
        }
    }, [response]);

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
}
