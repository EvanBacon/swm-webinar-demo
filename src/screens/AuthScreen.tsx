import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as React from 'react';
import { Button, TouchableOpacity, } from 'react-native';
import GoogleSignInButton from '../components/GoogleButton';
import { Text, View } from '../components/Themed';

export default function Login({
    setAuth,
}: {
    setAuth: (key: AuthSession.TokenResponse | null) => void;
}) {

    return (
        <View style={{ flex: 1, padding: 36, justifyContent: "space-around", alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 36, fontWeight: 'bold' }}>Market App</Text>
            <LoginButton
                setAuth={setAuth}
            />
        </View>
    );
}
function LoginButton({
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
        <GoogleSignInButton disabled={!request} onPress={() => {
            promptAsync()
        }}>Sign-In with Google</GoogleSignInButton>

    );
}
