/**
 * Forked from `@react-navigation/drawer` to add hover styles on web.
 */
import { DrawerItem, DrawerItemList as Original } from '@react-navigation/drawer';
import { CommonActions, DrawerActions, useLinkBuilder } from '@react-navigation/native';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { useHover } from 'react-native-web-hooks';

function CustomDrawerItem(props: React.ComponentProps<typeof DrawerItem>) {
    const ref = React.useRef(null)
    const isHovered = useHover(ref);

    return <View ref={ref}><DrawerItem  {...props} style={[props.style, Platform.select({
        default: {}, web: {
            transitionDuration: '100ms',
            transitionProperty: 'background-color'
        } as any
    }), isHovered && !props.focused && { backgroundColor: 'rgba(0, 0, 0, 0.05)' }]} /></View>
}

/**
 * Component that renders the navigation list in the drawer.
 */
export default function DrawerItemList({
    state,
    navigation,
    descriptors,
}: React.ComponentProps<typeof Original>) {
    const buildLink = useLinkBuilder();

    return (state.routes.map((route, i) => {
        const focused = i === state.index;
        const {
            title,
            drawerLabel,
            drawerIcon,
            drawerActiveTintColor,
            drawerInactiveTintColor,
            drawerActiveBackgroundColor,
            drawerInactiveBackgroundColor,
            drawerLabelStyle,
            drawerItemStyle,
        } = descriptors[route.key].options as any;

        return (
            <CustomDrawerItem
                key={route.key}
                label={
                    drawerLabel !== undefined
                        ? drawerLabel
                        : title !== undefined
                            ? title
                            : route.name
                }
                icon={drawerIcon}
                focused={focused}
                activeTintColor={drawerActiveTintColor}
                inactiveTintColor={drawerInactiveTintColor}
                activeBackgroundColor={drawerActiveBackgroundColor}
                inactiveBackgroundColor={drawerInactiveBackgroundColor}
                labelStyle={drawerLabelStyle}
                style={drawerItemStyle}
                to={buildLink(route.name, route.params)}
                onPress={() => {
                    navigation.dispatch({
                        ...(focused
                            ? DrawerActions.closeDrawer()
                            : CommonActions.navigate(route.name)),
                        target: state.key,
                    });
                }}
            />
        );
    }) as React.ReactNode) as React.ReactElement;
}
