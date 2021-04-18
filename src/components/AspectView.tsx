import * as React from 'react';
import { LayoutRectangle, StyleSheet } from 'react-native';

import { View } from '../components/Themed';


export function AspectView(props: React.ComponentProps<typeof View>) {
    const [layout, setLayout] = React.useState<LayoutRectangle | null>(null);

    const { aspectRatio = 1, ...inputStyle } =
        StyleSheet.flatten(props.style) || {};
    const style = [inputStyle, { aspectRatio }];

    if (layout) {
        const { width = 0, height = 0 } = layout;
        if (width === 0) {
            style.push({ width: height * aspectRatio, height });
        } else {
            style.push({ width, height: width * aspectRatio });
        }
    }

    return (
        <View
            {...props}
            style={style}
            onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
        />
    );
}
