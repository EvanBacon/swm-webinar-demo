import * as React from 'react';
import { FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { Product, useAPI } from '../utils/API';

function ProductItem({ item }: { item: Product }) {
  return (
    <TouchableOpacity onPress={() => {

    }} activeOpacity={0.7}>
      <View
        style={{
          borderRadius: 8,
          backgroundColor: "#F5F6F8",
          overflow: "hidden",
        }}
      >
        <Image source={{ uri: item.image }} style={{ aspectRatio: 1 }} />
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
          <Text
            style={{
              fontSize: 16,
              color: "#9B9EA7",
              marginTop: 8,
              fontWeight: "bold",
            }}
          >
            {item.price}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={value}
        keyExtractor={extractKey}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ minWidth: '100%', maxWidth: '100%' }}
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
