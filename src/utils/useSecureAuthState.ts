import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

import { useMounted, useSafeState, UseStateHook } from "./utils";

async function setSecureItemAsync(
  key: string,
  value: string | null
): Promise<string | null> {
  if (value == null) {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } else {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
  return value;
}

const getItemAsync = Platform.select<(key: string) => Promise<string | null>>({
  default: SecureStore.getItemAsync,
  web: AsyncStorage.getItem,
});

function useSecureState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useSafeState<string>();

  // Sanity
  const isMounted = useMounted();

  // Get
  React.useEffect(() => {
    getItemAsync(key)
      .then((value) => {
        if (isMounted.current) setState({ value });
      })
      .catch((error) => {
        if (isMounted.current) setState({ error });
      });
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: string | null) => {
      setSecureItemAsync(key, value)
        .then((value) => {
          if (isMounted.current) setState({ value });
        })
        .catch((error) => {
          if (isMounted.current) setState({ error });
        });
    },
    [key]
  );

  return [state, setValue];
}

export function useSecureAuthState(
  key: string
): UseStateHook<AuthSession.TokenResponse> {
  const [authState, setAuthState] = useSecureState(key);
  const [state, setState] = useSafeState<AuthSession.TokenResponse>();

  React.useEffect(() => {
    if (authState.value) {
      try {
        const parsed = new AuthSession.TokenResponse(
          JSON.parse(authState.value) as AuthSession.TokenResponseConfig
        );
        setState({ value: parsed });
      } catch {
        setState({
          value: null,
          error: new Error(
            `Failed to parse cached auth state: ${authState.value}`
          ),
        });
      }
    } else if (authState.error) {
      setState({ error: authState.error });
    } else {
      setState({});
    }
  }, [authState]);

  const setSecureAuthState = React.useCallback(
    (value: AuthSession.TokenResponse | null) => {
      if (!value) {
        setAuthState(null);
      } else {
        setAuthState(JSON.stringify(authToJSON(value)));
      }
    },
    [setAuthState]
  );

  return [state, setSecureAuthState];
}

function authToJSON({
  accessToken,
  tokenType,
  expiresIn,
  refreshToken,
  scope,
  state,
  idToken,
  issuedAt,
}: AuthSession.TokenResponse) {
  return {
    accessToken,
    tokenType,
    expiresIn,
    refreshToken,
    scope,
    state,
    idToken,
    issuedAt,
  };
}
