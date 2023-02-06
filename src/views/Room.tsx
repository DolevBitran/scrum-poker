import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '../../store';
import { getRoom } from '../../store/selectors/room.selector';

import Table from '../components/Table';
import VoteKeyboard from '../components/VoteKeyboard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Room({ }) {
    const route = useRoute<RouteProp<{ params: { roomId: string } }, 'params'>>()
    const room = useSelector(getRoom)
    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        if (!room.id && route.params?.roomId) {
            dispatch.room.reconnect({ roomId: route.params.roomId })
        }
    }, [])

    if (!room.id) {
        return null
    }

    return (
        <View style={styles.container}>
            <Table />
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