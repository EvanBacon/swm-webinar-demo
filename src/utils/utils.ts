import * as React from "react";
import { Image } from "react-native";

export type UseStateHook<T> = [
  { value: T | null; isLoading: boolean; error: Error | null },
  (value: T | null) => void
];

export function useSafeState<T>(initialValue?: {
  value: T | null;
  isLoading: boolean;
  error: Error | null;
}) {
  return React.useReducer(
    (
      state: { value: T | null; isLoading: boolean; error: Error | null },
      action: Partial<{
        value: T | null;
        isLoading: boolean;
        error: Error | null;
      }>
    ) => ({
      isLoading: action.isLoading ?? false,
      error: action.error === undefined ? null : action.error,
      value: action.value === undefined ? null : action.value,
    }),
    initialValue ?? { value: null, isLoading: true, error: null }
  );
}

export function useMounted() {
  return React.useRef(true).current;
}

export function useImageSize(uri: string) {
  // Public
  const [state, setState] = useSafeState<{ width: number; height: number }>();

  // Sanity
  const isMounted = useMounted();

  // Get
  React.useEffect(() => {
    Image.getSize(
      uri,
      (width, height) => {
        if (isMounted) setState({ value: { width, height }, error: null });
      },
      (error) => {
        if (isMounted) setState({ value: null, error });
      }
    );
  }, [uri]);

  return state;
}
