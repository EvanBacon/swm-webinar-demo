import * as React from 'react';

import GoogleSignInButton from '../components/GoogleButton';
import { Text, View } from '../components/Themed';
import { useSignIn } from '../utils/GoogleAuthSessionContext';

export default function Login() {
    return (
        <View style={{
            flex: 1,
            padding: 36,
            justifyContent: "space-around",
            alignItems: "center",
        }}>
            <Text style={{ textAlign: "center", fontSize: 36, fontWeight: "bold" }}>SWM Market App</Text>
            <LoginButton />
        </View>
    );
}

function LoginButton() {
    const signInAsync = useSignIn();
    return (
        <GoogleSignInButton
            disabled={!signInAsync}
            onPress={() => {
                signInAsync?.();
            }}
        >
            Sign-In with Google
        </GoogleSignInButton>
    );
}
