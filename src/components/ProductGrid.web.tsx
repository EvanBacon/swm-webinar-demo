import * as React from "react";
import { ScrollView } from "react-native";

import { Product } from "../utils/API";
import { View } from "./Themed";

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
        <ScrollView>
            <View
                style={{
                    flex: 1,
                    minWidth: "100%",
                    maxWidth: "100%",
                    paddingHorizontal: 32,
                    paddingVertical: 16,
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gridTemplateRows: "1fr",
                    display: "grid",
                    gap: "8px",
                }}
            >
                {data?.map((item, index) => (
                    <View
                        key={extractKey(item)}
                        style={{
                            flex: 1,
                        }}
                    >
                        {renderItem({ item, index })}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
