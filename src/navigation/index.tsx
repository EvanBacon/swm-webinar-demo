/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text, ColorSchemeName } from 'react-native';
import * as Localization from 'expo-localization';

import AuthScreen from '../screens/AuthScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { GoogleAuthSessionProvider, useTokenResponse } from '../utils/GoogleAuthSessionContext';

const config = {
  clientId: '834489759004-29segmepkrv7a5e9baj0s60g1j0cc08t.apps.googleusercontent.com',
  language: Localization.locale,
  iosClientId: '834489759004-5jdo1hr2hu6i77ulmbq6bl2mchck4t9k.apps.googleusercontent.com',
  // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GoogleAuthSessionProvider config={config}>
        <AuthNavigator />
      </GoogleAuthSessionProvider>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function AuthNavigator() {

  const [token] = useTokenResponse();

  const renderAuthScreen = React.useCallback(() => {
    return (<AuthScreen />)
  }, [])

  // Prevent jumpy state
  if (token.isLoading) {
    return null;
  }

  if (token.error) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Error getting cached auth: {token.error.message}</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      {!token.value && <Stack.Screen name="Auth" component={renderAuthScreen} />}
      {token.value && <Stack.Screen name="Root" component={MainTabNavigator} />}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
