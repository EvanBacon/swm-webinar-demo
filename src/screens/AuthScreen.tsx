import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as React from 'react';
import { Button, View } from 'react-native';

export default function Login({
    setAuth,
}: {
    setAuth: (key: AuthSession.TokenResponse | null) => void;
}) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '834489759004-29segmepkrv7a5e9baj0s60g1j0cc08t.apps.googleusercontent.com',
        // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;
            if (authentication) {
                setAuth(authentication);
            }
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
