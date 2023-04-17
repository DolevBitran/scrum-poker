import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, TextInput, I18nManager, Platform } from 'react-native';

import Lottie from '../Lottie';
import { LottieRefCurrentProps } from 'lottie-react';

import Text from '../Text';
import BottomSheet from '../BottomSheet';
import { BottomSheetRefProps } from '../BottomSheet/BottomSheet';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../../store';
import { GestureResponderEvent } from 'react-native';
import { getGuestName } from '../../../store/selectors/room.selector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

if (Platform.OS !== 'web') {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    I18nManager.swapLeftAndRightInRTL(false);
}

interface ICreateRoomMenuProps {
    roomRef: React.MutableRefObject<{
        roomId: string,
        roomName: string,
        guestName: string,
        options: IRoomOptions,
    }>;
    bottomSheetRef: React.Ref<BottomSheetRefProps>;
    snapPoints: number[];
}

const CreateRoomMenu = ({ roomRef, bottomSheetRef, snapPoints }: ICreateRoomMenuProps) => {
    const animationRef = React.useRef<LottieRefCurrentProps | null>(null);
    const roomNameInputRef = React.useRef<TextInput>(null);

    const guestName = useSelector(getGuestName)
    const dispatch = useDispatch<Dispatch>()

    const { loading, success, error } = useSelector(
        (rootState: iRootState) => rootState.loading.models.room
    )

    const onCreateRoomSubmit = async (e: GestureResponderEvent) => {
        const { roomName, guestName, options } = roomRef.current
        if (roomName && guestName) {
            await dispatch.room.create({ roomName, hostName: guestName, options })
            roomRef.current.roomName = ''
            roomRef.current.options = {}
        }
    }

    const Loading = () => <View style={{ alignItems: 'center' }}>
        <Lottie
            animationRef={animationRef}
            style={{ width: windowWidth * 0.4 }}
            source={require('../../../assets/lottie/loader.native.json')}
            autoPlay
            loop
        />
    </View>

    return (
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
            <View style={{ width: '80%', alignSelf: 'center' }}>
                {loading ?
                    <Loading /> :
                    <>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                ref={roomNameInputRef}
                                onChangeText={text => roomRef.current.roomName = text}
                                placeholder='Room name'
                                style={[styles.textInput, Platform.select({
                                    web: { outlineWidth: 0 },
                                })]} />

                        </View>

                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 5, paddingVertical: 2, marginBottom: 10 }}>
                            <TextInput defaultValue={guestName} onChangeText={text => roomRef.current.guestName = text} placeholder='Guest Name' />
                        </View>

                        <Text style={styles.textInput}>Cards styles</Text>
                        <Text style={styles.textInput}>Show average</Text>
                        <Text style={styles.textInput}>Show score</Text>
                        <TouchableOpacity style={styles.createButton} onPress={onCreateRoomSubmit}>
                            <Text style={styles.createText}>Create</Text>
                        </TouchableOpacity>
                    </>}
            </View>
        </BottomSheet >

    );
}

export default CreateRoomMenu;

const styles = StyleSheet.create({
    createButton: {
        width: '100%',
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4B536A',
        padding: 10,
        borderRadius: 16
    },
    createText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    textInputWrapper: {
        display: 'flex',
        justifyContent: 'center',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 14,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textInput: {
        fontSize: 20,
    },
});
