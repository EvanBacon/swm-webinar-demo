import { Link, useNavigation } from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";

import { useLayout } from "../hooks/useLayout";
import { Product } from "../utils/API";
import { ProductGrid } from "./ProductGrid";
import { View } from "./Themed";

const ProductImage = styled.Image`
  border-radius: 8px;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 0.5px;
  aspect-ratio: 1;
`;
const ProductTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const ProductSubtitle = styled.Text`
  font-size: 14px;
  color: #65676b;
  padding-top: 4px;
`;

function ProductItem({ item }: { item: Product }) {
    const { onLayout, ...layout } = useLayout();

    return (
        <View style={{ flex: 1 }} onLayout={onLayout}>
            <Link to={`/item/${item.id}`}>
                <ProductImage
                    style={{ width: layout.width, height: layout.width }}
                    source={{ uri: item.image }}
                />
                <View style={{ padding: 8 }}>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductSubtitle>${item.price}</ProductSubtitle>
                </View>
            </Link>
        </View>
    );
}

export function ProductList({ data }: { data: Product[] | null }) {
    const extractKey = React.useCallback((item: Product) => String(item.id), []);

    const renderItem = ({ item }: { item: Product; index: number }) => {
        return (
            <View style={{ flex: 1 }}>
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
