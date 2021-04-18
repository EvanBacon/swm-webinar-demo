import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentOptions,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import * as React from "react";
import {
    Platform,
    ScrollViewProps,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "../constants/Colors";
import {
    ProductsNavigator,
    ProfileNavigator,
    TabBarIcon,
} from "./BottomTabNavigator";

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function CustomDrawerContent({
    hideLabels,
    ...props
}: ScrollViewProps & {
    children?: React.ReactNode;
    hideLabels?: boolean;
} & DrawerContentComponentProps<DrawerContentOptions>) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList
                {...props}
                labelStyle={hideLabels ? { display: "none" } : undefined}
            />
        </DrawerContentScrollView>
    );
}

export default function MainTabNavigator(props: any) {
    const { width } = useWindowDimensions();
    const { left } = useSafeAreaInsets();
    const isMobile = width <= 640;
    const isTablet = !isMobile && width <= 960;
    const isLargeScreen = !isTablet && !isMobile;

    const renderTabs = React.useCallback(() => {
        return (
            <>
                <Tab.Screen
                    name="ProductsTab"
                    component={ProductsNavigator}
                    options={{
                        title: "All Items",
                        tabBarIcon: ({ color }) => (
                            <TabBarIcon name="basket" color={color} />
                        ),
                        drawerIcon: ({ color }) => (
                            <TabBarIcon name="basket" color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ProfileTab"
                    component={ProfileNavigator}
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color }) => (
                            <TabBarIcon name="person" color={color} />
                        ),
                        drawerIcon: ({ color }) => (
                            <TabBarIcon name="person" color={color} />
                        ),
                    }}
                />
            </>
        );
    }, []);

    // Use a tab bar on all except web desktop.
    // NOTE(brentvatne): if you navigate to an example screen and then resize your
    // browser such that the navigator changes from tab to drawer or drawer to tab
    // then it will reset to the list because the navigator has changed and the state
    // of its children will be reset.
    if (Platform.OS !== "web" || isMobile) {
        return (
            <Tab.Navigator
                // @ts-ignore: Tab.Navigator can be either bottom-tabs navigator
                // or material-bottom-tabs navigator
                // material-bottom-tabs props
                shifting
                activeTintColor={Colors.light.tabIconSelected}
                inactiveTintColor={Colors.light.tabIconDefault}
                barStyle={{
                    backgroundColor: Colors.light.tabBar,
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderTopColor: Colors.light.tabIconDefault,
                }}
                // bottom-tabs props
                tabBarOptions={{
                    style: {
                        backgroundColor: Colors.light.tabBar,
                    },
                    activeTintColor: Colors.light.tabIconSelected,
                    inactiveTintColor: Colors.light.tabIconDefault,
                }}
            >
                {renderTabs()}
            </Tab.Navigator>
        );
    }

    return (
        <Drawer.Navigator
            {...props}
            drawerContent={(props) => (
                <CustomDrawerContent {...props} hideLabels={isTablet} />
            )}
            drawerStyle={{ width: isLargeScreen ? undefined : 64 + left }}
            drawerType="permanent"
        >
            {renderTabs()}
        </Drawer.Navigator>
    );
}
