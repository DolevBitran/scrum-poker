import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type IHeaderTitleProps = {
    title: string;
    onPress?: () => void;
    onLongPress?: () => void;
}

const HeaderTitle: React.FC<IHeaderTitleProps> = ({ title, onPress, onLongPress }) => {

    return (
        <View style={styles.headerCenter}>
            <TouchableOpacity onPress={onPress && onPress} onLongPress={onLongPress && onLongPress}>
                <Text>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

export { HeaderTitle };


const styles = StyleSheet.create({
    headerCenter: {
    },
});
