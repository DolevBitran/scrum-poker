import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, TouchableOpacity, TextInput, I18nManager, Platform, ScrollView, useStateDimensions } from 'react-native';

import Lottie from '../components/Lottie';
import { LottieRefCurrentProps } from 'lottie-react';

import Text from '../components/Text';
import BottomSheet from '../components/BottomSheet';
import { BottomSheetRefProps } from '../components/BottomSheet/BottomSheet';

import ActiveScrums from '../components/ActiveScrums';
import ScrumHistory from '../components/ScrumHistory';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../store';
import { GestureResponderEvent } from 'react-native';
import { getGuestName } from '../../store/selectors/room.selector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

if (Platform.OS !== 'web') {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    I18nManager.swapLeftAndRightInRTL(false);
}

export default function Home() {
    const navigation = useNavigation()
    const animationRef = React.useRef<LottieRefCurrentProps | null>(null);
    const bottomSheetRef = React.useRef<BottomSheetRefProps>(null);
    const roomNameInputRef = React.useRef<TextInput>(null);
    const guestNameInputRef = React.useRef<TextInput>(null);
    const joinRoomInputRef = React.useRef<TextInput>(null);

    const roomRef = React.useRef({
        roomId: '',
        roomName: '',
        guestName: '',
        options: {},
    })

    const guestName = useSelector(getGuestName)

    React.useEffect(() => {
        if (guestName) {
            roomRef.current.guestName = guestName
        }
    }, [guestName])


    const dispatch = useDispatch<Dispatch>()

    const { loading, success, error } = useSelector(
        (rootState: iRootState) => rootState.loading.models.room
    )

    const snapPoints = [0, 0.5]
    const onCreateButtonPressed = () => bottomSheetRef.current && bottomSheetRef.current.scrollTo(snapPoints[1])
    const onCreateRoomSubmit = async (e: GestureResponderEvent) => {
        const { roomName, guestName, options } = roomRef.current
        if (roomName && guestName) {
            await dispatch.room.create({ roomName, hostName: guestName, options })
            // const roomId = await dispatch.room.create()
        }
    }
    const onJoinRoom = async () => {
        const { roomId, guestName } = roomRef.current
        if (roomId && guestName) {
            await dispatch.room.join({ roomId, guestName })
        }
    }

    const bodyScrollViewProps = {
        style: styles.body,
        showsVerticalScrollIndicator: false,
        alwaysBounceVertical: false,
        alwaysBounceHorizontal: false,
        bounces: false
    }

    const Loading = () => <View style={{ alignItems: 'center' }}>
        <Lottie
            animationRef={animationRef}
            style={{ width: windowWidth * 0.4 }}
            source={require('../../assets/lottie/loader.native.json')}
            autoPlay
            loop
        />
    </View>

    const Join = () => <View style={{
        width: '80%',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        alignSelf: 'center',
        marginBottom: 30,
        paddingVertical: 10
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <View>
                <View style={{ backgroundColor: '#fff', paddingHorizontal: 5, paddingVertical: 2, marginBottom: 10 }}>
                    <TextInput defaultValue={guestName} ref={guestNameInputRef} onChangeText={text => roomRef.current.guestName = text} placeholder='Guest Name' />
                </View>
                <View style={{ backgroundColor: '#fff', paddingHorizontal: 5, paddingVertical: 2 }}>
                    <TextInput ref={joinRoomInputRef} onChangeText={text => roomRef.current.roomId = text} placeholder='Room ID' />
                </View>
            </View>
            <TouchableOpacity onPress={onJoinRoom}>
                <Text>Join</Text>
            </TouchableOpacity>
        </View>
    </View>

    return (
        <View style={styles.container}>
            {/* Body */}
            <ScrollView {...bodyScrollViewProps} >
                <Join />
                <ActiveScrums />
                <ScrumHistory onCreateRoomPressed={onCreateButtonPressed} />
            </ScrollView>
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
            {/* Status Bar */}
            < StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        writingDirection: 'ltr',
        overflow: 'hidden',
        width: '100%'
    },
    body: {
        paddingTop: 40,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
    },
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
        border: '1px solid black',
        borderRadius: 14,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textInput: {
        fontSize: 20,
    },
});




        // {/* Join Card */}
        // <LinearGradient
        //   // colors={['rgb(255, 241, 235)', 'rgb(172, 224, 249)']}
        //   colors={['#AFAFAF', '#AFAFAF']}
        //   start={[0.01, 0.01]}
        //   end={[0.2, 0.6]}
        //   locations={[0.1, 0.9]}
        //   style={styles.joinContainer}>
        //   <Text style={styles.joinHeader}>Join an existing room</Text>
        //   <View style={styles.searchRow}>
        //     <View style={styles.joinInputWrapper}>
        //       {/* @ts-ignore */}
        //       <TextInput style={[styles.joinTextInput, Platform.select({
        //         web: { outlineWidth: 0 }
        //       })]} placeholder='ex: 324566' placeholderTextColor='lightgray' />
        //     </View>
        //     <TouchableOpacity>
        //       <Text style={styles.joinText}>Join</Text>
        //     </TouchableOpacity>
        //   </View>
        // </LinearGradient>

        // {/* Lottie Test */}
        // <Lottie
        //   //@ts-ignore
        //   animationRef={animationRef}
        //   style={{ width: windowWidth * 0.8 }}
        //   source={require('../assets/lottie/planning.json')}
        //   autoPlay
        //   loop
        // />