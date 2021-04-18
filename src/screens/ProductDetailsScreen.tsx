import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Colors from "../constants/Colors";
import { ProductsParamList } from "../types";

export default function DetailScreen({
    navigation,
    route,
}: StackScreenProps<ProductsParamList, "ProductDetails">) {

    console.log("props:", route.params.item);
    const product = route.params.item;
    return (
        <View style={styles.detailContainer}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{ width: "100%", maxWidth: "100%", aspectRatio: 1 }}
                    resizeMode="cover"
                    source={{ uri: product.image }}
                />
                <Text
                    style={{ color: Colors.light.text, fontSize: 20, fontWeight: "bold" }}
                >
                    {product.title}
                </Text>
                <Text style={{ color: Colors.light.text, fontSize: 20, opacity: 0.6 }}>
                    ${product.price}
                </Text>
            </View>
            <View style={{ padding: 12 }}>
                <BuyButton />
            </View>
        </View>
    );
}

function BuyButton() {
    return (
        <View
            style={{
                justifyContent: "center",
                backgroundColor: Colors.light.tint,
                alignItems: "center",
                borderRadius: 8,
            }}
        >
            <Text
                style={{
                    fontWeight: "bold",
                    color: Colors.light.background,
                    textAlign: "center",
                    paddingVertical: 18,
                    fontSize: 16,
                }}
            >
                Add to Cart
      </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 30,
        fontWeight: "bold",
        fontSize: 35,
    },
    caption: {
        fontSize: 20,
        opacity: 0.5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: "cover",
    },
    detailContainer: {
        flex: 1,
    },
    detailImage: {
        width: "100%",
        height: "100%",
    },
    detailText: {
        marginTop: 20,
        color: "white",
        fontSize: 60,
        fontWeight: "bold",
    },
});
