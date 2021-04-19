import Ionicons from '@expo/vector-icons/build/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useThemeColor } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { ProductsParamList, ProfileParamList } from '../types';


// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ProductsStack = createStackNavigator<ProductsParamList>();

export function ProductsNavigator() {
  const theme = useColorScheme();
  const headerTintColor = Colors[theme].tint;

  return (
    <ProductsStack.Navigator screenOptions={{ headerTintColor }}>
      <ProductsStack.Screen
        options={{ title: "Products" }}
        name="ProductList"
        component={ProductListScreen}
      />
      <ProductsStack.Screen
        name="ProductDetails"
        options={{
          title: "Details",
        }}
        component={ProductDetailsScreen}
      />
    </ProductsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

export function ProfileNavigator() {
  const theme = useColorScheme();
  const headerTintColor = Colors[theme].tint;
  return (
    <ProfileStack.Navigator screenOptions={{ headerTintColor }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </ProfileStack.Navigator>
  );
}

