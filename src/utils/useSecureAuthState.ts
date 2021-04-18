import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import * as React from "react";

import { useMounted, useSafeState, UseStateHook } from "./utils";

async function setSecureItemAsync(
  key: string,
  value: string | null
): Promise<string | null> {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
  return value;
}

function useSecureState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useSafeState<string>();

  // Sanity
  const isMounted = useMounted();

  // Get
  React.useEffect(() => {
    SecureStore.getItemAsync(key)
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
