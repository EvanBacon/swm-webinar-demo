/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Auth: "auth",
      Root: {
        screens: {
          ProductsTab: {
            screens: {
              ProductList: "product-list",
              ProductDetails: {
                path: "item/:id",
                parse: {
                  id: Number,
                },
              },
            },
          },
          ProfileTab: {
            screens: {
              Profile: "profile",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
