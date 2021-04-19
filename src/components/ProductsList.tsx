import { Link, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, Platform } from "react-native";

import { useLayout } from "../hooks/useLayout";
import { Product } from "../utils/API";
import { ProductGrid } from "./ProductGrid";
import { Text, View } from "./Themed";


function ProductItem({ item }: { item: Product }) {
    const { onLayout, ...layout } = useLayout();

    return (
        <View style={{ flex: 1 }} onLayout={onLayout}>
            <Link to={`/item/${item.id}`}>
                <Image
                    style={{
                        borderRadius: 8,
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: StyleSheet.hairlineWidth,
                        aspectRatio: 1,
                        width: layout.width, maxWidth: layout.width, height: layout.width, maxHeight: layout.width, resizeMode: 'cover'
                    }}
                    source={{ uri: item.image }}
                />
                <View style={{ padding: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >{item.title}</Text>
                    <Text style={{ fontSize: 14, paddingTop: 4 }} lightColor={'#65676b'} darkColor={'white'}>${item.price}</Text>
                </View>
            </Link>
        </View>
    );
}

export function ProductList({ data }: { data: Product[] | null }) {
    const extractKey = React.useCallback((item: Product) => String(item.id), []);

    const renderItem = ({ item }: { item: Product; index: number }) => {
        return (
            <View style={{ flex: 1, padding: Platform.select({ default: 8, web: 0 }) }}>
                <ProductItem item={item} />
            </View>
        );
    };

    // const navigation = useNavigation()

    // React.useEffect(() => {
    //     navigation.navigate('ProductDetails', { id: 1 })
    // }, []);

    return (
        <View style={{ flex: 1, alignItems: "stretch" }}>
            <ProductGrid
                renderItem={renderItem}
                data={data}
                extractKey={extractKey}
            />
        </View>
    );
}
