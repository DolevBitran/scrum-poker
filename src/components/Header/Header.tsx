import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { getRoom } from '../../../store/selectors/room.selector';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type IHeaderProps = {

}

const Header: React.FC<IHeaderProps> = ({ }) => {
    const route = useRoute()
    const room = useSelector(getRoom)

    const HeaderText = React.useMemo(() => {
        switch (true) {
            case route.name === 'Room':
                return `${room.name} -- ${room.id}`
            default:
                return 'Scrum Poker'
        }
    }, [route.name, room])

    const onPress = () => {
        console.log('onPress')
        if (room.id) {
            navigator.clipboard.writeText(room.id);
        }
    }

    const onLongPress = () => {
        console.log('onLongPress')
        // @TODO: Open share menu
    }

    return (
        <View style={styles.wrapper} >
            <View style={styles.container}>
                <Entypo style={styles.menuIcon} name="menu" size={24} color="black" />
                <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
                    <Text>{HeaderText}</Text>
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'right' }}>ACTION 2</Text>
            </View>
        </View>
    );
}

export { Header };


const styles = StyleSheet.create({
    wrapper: {
        height: 130,
        width: '100%',
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
        width: '80%',
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
