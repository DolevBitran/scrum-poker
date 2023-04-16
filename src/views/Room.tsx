import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '../../store';
import { getRoom } from '../../store/selectors/room.selector';

import Table from '../components/Table';
import VoteKeyboard from '../components/VoteKeyboard';
import Summary from '../components/Summary';
import { ROOM_MODE } from '../constants/constants';
import { getRoomMode } from '../../store/selectors/app.selector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Room({ }) {
    const route = useRoute<RouteProp<{ params: { roomId: string } }, 'params'>>()
    const room = useSelector(getRoom)
    const roomMode = useSelector(getRoomMode)
    const dispatch = useDispatch<Dispatch>()

    const shouldShowTable = roomMode === ROOM_MODE.TABLE

    const resetRoom = () => {
        dispatch.room.onRoomClosed()
    }

    useEffect(() => {
        if (!room.id && route.params?.roomId) {
            // @TODO remove reconnect and use join
            dispatch.room.reconnect({ roomId: route.params.roomId })
        }
        return resetRoom
    }, [])

    if (!room.id) {
        return null
    }

    return (
        <View style={styles.container}>
            {shouldShowTable ?
                <Table /> :
                <Summary />
            }
            <VoteKeyboard />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: windowHeight * 0.05,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        writingDirection: 'ltr',
        overflow: 'hidden',
    },
});