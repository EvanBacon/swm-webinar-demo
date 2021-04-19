import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import {
    ActivityIndicator,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";

import Colors from "../constants/Colors";
import { ProductsParamList } from "../types";
import { useProduct } from "../utils/API";
import { BlurView } from "expo-blur";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import { useMounted, useSafeState } from "../utils/utils";

type ViewProps = React.ComponentProps<typeof View>;

function BlurryBackdrop({
    uri,
    style,
    children,
}: {
    uri: string;
    style?: ViewProps["style"];
    children?: any;
}) {
    return (
        <View style={style}>
            <Image style={StyleSheet.absoluteFill} source={{ uri }} />
            <BlurView style={StyleSheet.absoluteFill} intensity={99} />
            {children}
        </View>
    );
}

export default function DetailScreen({
    navigation,
    route,
}: StackScreenProps<ProductsParamList, "ProductDetails">) {
    const { value: product, error } = useProduct(route.params.id);

    if (error) {
        return (
            <View>
                <Text>
                    Error getting product for ID: {route.params.id}: {error.message}
                </Text>
            </View>
        );
    }
    if (!product) {
        return <ActivityIndicator />;
    }

    const dims = useWindowDimensions();

    const isHorizontal = dims.width > 900;
    const flexDirection = isHorizontal ? "row" : "column";

    const blurStyle = isHorizontal ? { height: "100%" } : { width: "100%" };
    return (
        <View style={{ flex: 1, flexDirection }}>
            <BlurryBackdrop uri={product.image} style={[blurStyle, { flex: 1 }]}>
                <Image
                    source={{ uri: product.image }}
                    style={{ resizeMode: "contain", ...StyleSheet.absoluteFillObject }}
                />
            </BlurryBackdrop>
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={!isHorizontal ? {} : { maxWidth: "100%" }}
                >
                    <View
                        style={{
                            flex: 1,

                            flexDirection: "column",
                        }}
                    >
                        <View style={{ flex: 1, padding: 16 }}>
                            <Text
                                lightColor={Colors.light.text}
                                darkColor={Colors.dark.text}
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}
                            >
                                {product.title}
                            </Text>
                            <Text
                                lightColor={Colors.light.text}
                                darkColor={Colors.dark.text}
                                style={{
                                    fontSize: 20,
                                    opacity: 0.6,
                                    paddingTop: 4,
                                }}
                            >
                                ${product.price}
                            </Text>
                            <Text
                                lightColor={Colors.light.text}
                                darkColor={Colors.dark.text}
                                style={{ fontSize: 14, paddingTop: 4 }}
                            >
                                {product.description}
                            </Text>

                            <Tags tagString={product.category} />
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        padding: 12,
                        borderTopColor: "rgba(0,0,0,0.2)",
                        borderTopWidth: StyleSheet.hairlineWidth,
                    }}
                >
                    <BuyButton />
                </View>
            </View>
        </View>
    );
}

function Tags({ tagString }: { tagString?: string }) {
    const tags = React.useMemo(() => (tagString ? tagString.split(" ") : []), [
        tagString,
    ]);

    return (
        <View style={{ paddingVertical: 16 }}>
            <Text
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingBottom: 12,
                }}
            >
                Tags
      </Text>
            <View style={{ flexDirection: "row" }}>
                {tags.map((tag, index) => (
                    <Tag key={String(index)} padNext={index !== 0}>
                        {tag}
                    </Tag>
                ))}
            </View>
        </View>
    );
}

function Tag({ children, padNext }: { children: string; padNext: boolean }) {
    return (
        <View
            lightColor={"#e4e6eb"}
            darkColor={Colors.light.tint}
            style={{
                paddingHorizontal: 18,
                paddingVertical: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                marginLeft: padNext ? 8 : 0,
            }}
        >
            <Text
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                style={{ fontWeight: "bold", textAlign: "center" }}
            >
                {children}
            </Text>
        </View>
    );
}

function BuyButton() {
    return (
        <TouchableOpacity onPress={() => { }}>
            <View
                cursor="not-allow"
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
        </TouchableOpacity>
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
        flexDirection: "row",
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
