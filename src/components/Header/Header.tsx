import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { HOME_ROUTES } from '../../routes/HomeStack';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type IHeaderProps = {

}

const Header: React.FC<IHeaderProps> = ({ }) => {
    const route = useRoute()

    const HeaderText = React.useMemo(() => {
        switch (true) {
            case route.name === HOME_ROUTES.TABLE:
                return 'Room xxx-xxx'
            default:
                return 'Scrum Poker'
        }
    }, [route.name])

    return (
        <View style={styles.wrapper} >
            <View style={styles.container}>
                <Entypo style={styles.menuIcon} name="menu" size={24} color="black" />
                <Text>{HeaderText}</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>ACTION 2</Text>
            </View>
        </View>
    );
}

export { Header };


const styles = StyleSheet.create({
    wrapper: {
        height: 130,
        width: windowWidth,
        paddingHorizontal: 40,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textWrapper: {
        width: windowWidth * 0.8,
        justifyContent: 'center',
        height: 50,
        borderRadius: 20,
        backgroundColor: '#AFAFAF'
    },
    text: {
        textAlign: 'center',
        color: 'transparent'
    },
    menuIcon: {
        flex: 1,
        alignSelf: 'flex-start'
    }

});
