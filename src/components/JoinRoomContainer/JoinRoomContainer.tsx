import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, TextInput, I18nManager, Platform } from 'react-native';
import Text from '../Text';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '../../../store';
import { getGuestName } from '../../../store/selectors/room.selector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

if (Platform.OS !== 'web') {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    I18nManager.swapLeftAndRightInRTL(false);
}

interface IJoinRoomContainerProps {
    roomRef: React.MutableRefObject<{
        roomId: string,
        roomName: string,
        guestName: string,
        options: IRoomOptions,
    }>;
}

const JoinRoomContainer = ({ roomRef }: IJoinRoomContainerProps) => {
    const guestNameInputRef = React.useRef<TextInput>(null);
    const joinRoomInputRef = React.useRef<TextInput>(null);

    const guestName = useSelector(getGuestName)
    const dispatch = useDispatch<Dispatch>()

    const onJoinRoom = async () => {
        const { roomId, guestName } = roomRef.current
        if (roomId && guestName) {
            await dispatch.room.join({ id: roomId, guestName })
            roomRef.current.roomId = ''
        }
    }

    return (
        <View style={styles.joinRoomWrapper}>
            <View style={styles.joinRoomContainer}>
                <View>
                    <View style={[styles.textInputWrapper, styles.spaceUnder]}>
                        <TextInput defaultValue={guestName} ref={guestNameInputRef} onChangeText={text => roomRef.current.guestName = text} placeholder='Guest Name' />
                    </View>
                    <View style={styles.textInputWrapper}>
                        <TextInput ref={joinRoomInputRef} onChangeText={text => roomRef.current.roomId = text} placeholder='Room ID' />
                    </View>
                </View>
                <TouchableOpacity onPress={onJoinRoom}>
                    <Text>Join</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default JoinRoomContainer;

const styles = StyleSheet.create({
    joinRoomWrapper: {
        width: '80%',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        alignSelf: 'center',
        marginBottom: 30,
        paddingVertical: 10
    },
    joinRoomContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    textInputWrapper: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    spaceUnder: {
        marginBottom: 10
    }
});
