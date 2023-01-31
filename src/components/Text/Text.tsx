import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export interface IAppTextProps extends TextProps {
}

const WEIGHTS = {
    100: '100',
    200: '200',
    300: '300',
    400: '400',
    500: '500',
    600: '600',
    700: '700',
    800: '800',
    900: '900',
    bold: '600',
    normal: '400',
}

const AppText: React.FC<IAppTextProps> = ({ style, children, ...props }) => {
    //@ts-ignore
    const { fontWeight } = style || {}
    const textStyles = [style, styles.text]
    if (fontWeight) {
        // @ts-ignore
        textStyles.push({ fontFamily: `Rubik-${WEIGHTS[fontWeight]}` })
    }

    return (
        <Text style={textStyles} {...props}>
            {children}
        </Text>
    );
}

export { AppText };

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Rubik',
        fontWeight: undefined
    }
});
