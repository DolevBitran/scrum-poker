import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

import { RoomToolbar } from './RoomToolbar';
import { UpperHeader } from './UpperHeader';
import { useSelector } from 'react-redux';
import { getRoom } from '../../../store/selectors/room.selector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type IHeaderProps = {

}

const Header: React.FC<IHeaderProps> = ({ }) => {
    const route = useRoute()
    const navigation = useNavigation()
    const room = useSelector(getRoom)
    const isOnRoomView = route.name === 'Room'

    const headerText = React.useMemo(() => {
        switch (true) {
            case isOnRoomView:
                return `${room.name} -- ${room.id}`
            default:
                return 'Scrum Poker'
        }
    }, [route.name, room])

    const HEADER_ACTIONS = {
        BACK: {
            icon: <Ionicons style={styles.menuIcon} name="arrow-back-outline" size={24} color="#2C416F" />,
            onPress: () => navigation.goBack()
        },
        MENU: {
            icon: <Entypo style={styles.menuIcon} name="menu" size={24} color="#2C416F" />,
            onPress: () => navigation.goBack()
        }
    }

    return (
        <View style={styles.headerWrapper} >
            <View style={styles.headerContainer}>
                {/* Upper Header Component*/}
                <UpperHeader
                    headerText={headerText}
                    leftHeaderAction={isOnRoomView ? HEADER_ACTIONS.BACK : HEADER_ACTIONS.MENU}
                    rightHeaderAction={isOnRoomView ? HEADER_ACTIONS.MENU : null}
                />
                {/* Bottom Header Component */}
                {isOnRoomView && <RoomToolbar />}
            </View>
        </View>
    );
}

export { Header };


const styles = StyleSheet.create({
    headerWrapper: {
        height: 130,
        width: '100%',
        paddingHorizontal: 40,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 30,
        justifyContent: 'space-between'
    },
    menuIcon: {
        // flex: 1,
        // alignSelf: 'flex-start'
    }
});
