import * as React from "react";
import { FlatList } from "react-native";

import { Product } from "../utils/API";

export function ProductGrid({
    data,
    renderItem,
    extractKey,
}: {
    extractKey: (item: Product) => string;
    data: Product[] | null;
    renderItem: ({
        item,
        index,
    }: {
        item: Product;
        index: number;
    }) => JSX.Element;
}) {
    return (
        <FlatList
            data={data}
            keyExtractor={extractKey}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{ minWidth: "100%", maxWidth: "100%" }}
            style={{ flex: 1, paddingHorizontal: 32 }}
        />
    );
}
