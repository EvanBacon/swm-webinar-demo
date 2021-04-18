import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, Image, LayoutRectangle, Platform, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { AspectView } from '../components/AspectView';

import { Text, View } from '../components/Themed';
import { Product, useAPI } from '../utils/API';


function ProductItem({ item }: { item: Product }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetails", { item });
      }}
      activeOpacity={0.7}
    >
      <View
        style={{
          borderRadius: 8,
          backgroundColor: "#F5F6F8",
          overflow: "hidden",
        }}
      >
        <AspectView style={{ aspectRatio: 1 }}>
          <Image source={{ uri: item.image }} style={{ flex: 1, }} />
        </AspectView>
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#9B9EA7",
              marginTop: 8,
              fontWeight: "bold",
            }}
          >
            ${item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function TabOneScreen() {
  const { value } = useAPI();
  const extractKey = React.useCallback((item: Product) => String(item.id), []);

  const renderItem = ({ item, index }: { item: Product; index: number }) => {
    return (
      <View style={{ flex: 1, width: "50%", maxWidth: "50%", padding: 8 }}>
        <ProductItem item={item} />
      </View>
    );
  };

  const renderHeader = () => {
    return <View />;
  };

  const dims = useWindowDimensions()

  return (
    <View style={styles.container}>
      <FlatList
        data={value}
        keyExtractor={extractKey}
        renderItem={renderItem}
        numColumns={Platform.OS === 'web' ? 3 : 2}
        columnWrapperStyle={{ minWidth: "100%", maxWidth: "100%" }}
        style={{ flex: 1 }}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
