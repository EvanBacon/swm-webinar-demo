import React from 'react';
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { useSignIn } from '../utils/GoogleAuthSessionContext';

const googleIcon = require('../../assets/images/google.png')

export default function GoogleSignInButton({ children, style, ...props }: { children?: React.ReactNode, style?: StyleProp<ViewStyle> }) {

    const signInAsync = useSignIn();
    const disabled = !signInAsync;

    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.6}
            style={StyleSheet.flatten([styles.touchable, style])}
            onPress={() => {
                signInAsync?.()
            }}
            {...props}>
            <View style={[styles.content, disabled && { opacity: 0.5 }]}>
                <Image source={googleIcon} style={styles.icon} />
                <Text style={styles.text}>{children}</Text>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    touchable: {
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        shadowOffset: { width: 0, height: 1 },
        overflow: 'visible',
        shadowColor: 'black',
        backgroundColor: 'white',
        borderRadius: 4,
    },
    content: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: { width: 24, height: 24, aspectRatio: 1 },
    text: { color: 'gray', marginLeft: 12, fontSize: 16, fontWeight: '600' },
});
