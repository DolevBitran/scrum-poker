import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRoom } from '../../../store/selectors/room.selector';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconButton from '../IconButton';
import { Dispatch } from '../../../store';
import { getRoomMode } from '../../../store/selectors/app.selector';
import { ROOM_MODE } from '../../constants/constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type IHeaderProps = {

}

const Header: React.FC<IHeaderProps> = ({ }) => {
    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useDispatch<Dispatch>()
    const room = useSelector(getRoom)
    const roomMode = useSelector(getRoomMode)

    const isOnRoomView = route.name === 'Room'

    const HeaderText = React.useMemo(() => {
        switch (true) {
            case isOnRoomView:
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

    const onToggleRoomMode = () => {
        dispatch.app.setRoomMode(roomMode === ROOM_MODE.TABLE ? ROOM_MODE.SUMMARY : ROOM_MODE.TABLE)
    }

    const LeftHeaderComponent = () => <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconButton style={{ alignSelf: 'flex-start' }}>
                <Ionicons style={styles.menuIcon} name="arrow-back-outline" size={24} color="#2C416F" />
            </IconButton>
        </TouchableOpacity>
    </View>

    const RightHeaderComponent = () => <View style={styles.headerRight}>
        <IconButton style={{ alignSelf: 'flex-end' }}>
            <Entypo style={styles.menuIcon} name="menu" size={24} color="#2C416F" />
        </IconButton>
    </View>

    const CenterHeaderComponent = () => <View style={styles.headerCenter}>
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
            <Text>{HeaderText}</Text>
        </TouchableOpacity>
    </View>

    return (
        <View style={styles.wrapper} >
            <View style={[{ flex: 1, alignItems: 'flex-start', paddingTop: 30, justifyContent: 'space-between' }]}>
                <View style={styles.container}>
                    <LeftHeaderComponent />
                    <CenterHeaderComponent />
                    <RightHeaderComponent />
                </View>
                {isOnRoomView && <View style={styles.container2}>
                    <TouchableOpacity onPress={onToggleRoomMode} >
                        <IconButton style={{ alignSelf: 'flex-start' }}>
                            {/* <Ionicons style={styles.menuIcon} name="list-outline" size={24} color="black" /> */}
                            <Feather name="clipboard" size={24} color="#2C416F" />
                        </IconButton>
                    </TouchableOpacity>
                </View>}
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
        backgroundColor: '#fff',
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container2: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    headerLeft: {
        flex: 1,
    },
    headerCenter: {
    },
    headerRight: {
        flex: 1,
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
        // flex: 1,
        // alignSelf: 'flex-start'
    }

});
