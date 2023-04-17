import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, I18nManager, Platform, ScrollView } from 'react-native';

import { BottomSheetRefProps } from '../components/BottomSheet/BottomSheet';

import ActiveScrums from '../components/ActiveScrums';
import ScrumHistory from '../components/ScrumHistory';
import { useSelector } from 'react-redux';
import { getGuestName } from '../../store/selectors/room.selector';
import CreateBottomSheet from '../components/CreateBottomSheet';
import JoinRoomContainer from '../components/JoinRoomContainer';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

if (Platform.OS !== 'web') {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    I18nManager.swapLeftAndRightInRTL(false);
}

export default function Home() {
    const bottomSheetRef = React.useRef<BottomSheetRefProps>(null);
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

    const snapPoints = [0, 0.5]
    const onCreateButtonPressed = () => bottomSheetRef.current && bottomSheetRef.current.scrollTo(snapPoints[1])

    const bodyScrollViewProps = {
        style: styles.body,
        showsVerticalScrollIndicator: false,
        alwaysBounceVertical: false,
        alwaysBounceHorizontal: false,
        bounces: false
    }

    return (
        <View style={styles.container}>
            {/* Body */}
            <ScrollView {...bodyScrollViewProps} >
                <JoinRoomContainer roomRef={roomRef} />
                <ActiveScrums />
                <ScrumHistory onCreateRoomPressed={onCreateButtonPressed} />
            </ScrollView>
            {/* BottomSheet */}
            <CreateBottomSheet roomRef={roomRef} bottomSheetRef={bottomSheetRef} snapPoints={snapPoints} />
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