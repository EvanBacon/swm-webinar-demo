/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Product } from "./utils/API";

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  ProductsTab: undefined;
  ProfileTab: undefined;
};

export type ProductsParamList = {
  ProductList: undefined;
  ProductDetails: { item: Product };
};

export type ProfileParamList = {
  Profile: undefined;
};
