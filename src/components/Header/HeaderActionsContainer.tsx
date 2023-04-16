import React from 'react';
import { View, Dimensions, StyleSheet, ViewStyle } from 'react-native';
import IconButton from '../IconButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type IHeaderActionsContainerProps = {
    icon: JSX.Element | undefined;
    style?: ViewStyle;
    onPress?: () => void | undefined;
    onLongPress?: () => void | undefined;
}

const HeaderActionsContainer: React.FC<IHeaderActionsContainerProps> = ({ icon, style, ...props }) => {

    return (
        <View style={[styles.headerActionsContainer, style]}>
            {icon && (<IconButton {...props}>
                {icon}
            </IconButton>)}
        </View>
    );
}

export { HeaderActionsContainer };


const styles = StyleSheet.create({
    headerActionsContainer: {
        flex: 1,
        flexWrap: 'wrap'
    },
});
