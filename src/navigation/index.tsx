/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text, ColorSchemeName } from 'react-native';

import AuthScreen from '../screens/AuthScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import { useSecureAuthState } from '../utils/useSecureAuthState';
// import BottomTabNavigator from './BottomTabNavigator';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function AuthNavigator() {

  const [authState, setAuthState] = useSecureAuthState("auth.shopify");

  const renderAuthScreen = React.useCallback(() => {
    return (<AuthScreen setAuth={setAuthState} />)
  }, [setAuthState])

  if (authState.error) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Error getting cached auth: {authState.error.message}</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!authState.value && <Stack.Screen name="Auth" component={renderAuthScreen} />}
      {authState.value && <Stack.Screen name="Root" component={MainTabNavigator} />}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
