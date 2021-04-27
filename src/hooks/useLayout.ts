import { useState, useCallback } from "react";
import { useMounted } from "../utils/utils";

export function useLayout() {
  const [layout, setLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const isMounted = useMounted();
  const onLayout = useCallback((e) => {
    if (isMounted) {
      setLayout(e.nativeEvent.layout);
    }
  }, []);

  return {
    onLayout,
    ...layout,
  };
}
