import * as React from 'react';

import { useStorageState } from './useStorageState';
import { UseStateHook } from './utils';

export function createStorageContextProvider(key: string): [
    ({ children, }: {
        children?: React.ReactNode;
    }) => JSX.Element,
    () => UseStateHook<string>
] {
    const StorageContext = React.createContext<UseStateHook<string> | null>(null);

    StorageContext.displayName = `StorageContext_${key}`;

    function StorageProvider({
        children,
    }: {
        children?: React.ReactNode;
    }) {
        const value = useStorageState(key)
        return (<StorageContext.Provider value={value}>{children}</StorageContext.Provider>);
    }
    function useStorage(): UseStateHook<string> {
        const storage = React.useContext(StorageContext);
        if (storage == null) {
            throw new Error(
                `No storage value available for key "${key}". Make sure you are rendering \`<StorageProvider>\` at the top of your app.`,
            );
        }
        return storage;
    }
    return [StorageProvider, useStorage]

}
