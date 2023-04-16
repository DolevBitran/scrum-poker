import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface IIconButtonProps {
    children?: React.ReactNode;
    style?: ViewStyle;
    onPress?: () => void;
}

const IconButton: React.FC<IIconButtonProps> = ({ children, style = {}, ...props }) => {

    return (
        <TouchableOpacity containerStyle={[styles.iconWrapper, style]} {...props}>
            {children}
        </TouchableOpacity>
    )
}

export { IconButton };

const styles = StyleSheet.create({
    iconWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        width: 42,
        height: 42,
        backgroundColor: '#F7FAFF'
    },
});
