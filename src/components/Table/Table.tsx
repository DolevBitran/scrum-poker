import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, LayoutChangeEvent } from 'react-native';
import { getRoom } from '../../../store/selectors/room.selector';
import { useSelector } from 'react-redux';
import Text from '../Text';
import { useTransition, config, TransitionState } from '@react-spring/native';
// import Guest from '../Guest';
import SEATS from '../../Seats';
import { animated, SpringValue } from '@react-spring/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type ITableProps = {
}

const Table: React.FC<ITableProps> = ({ }) => {
    const room = useSelector(getRoom)
    const guests = room.guests

    const [transitions, transitionAPI] = useTransition(guests, () => ({
        from: { opacity: 0 },
        enter: { opacity: 1, config: { ...config.molasses, duration: 100 } },
        leave: { opacity: 0, config: { ...config.molasses, duration: 100 } },
    }))

    const Guest = ({ style, guest, controller, index }: {
        guest: IGuest, index: number, style: { opacity: SpringValue<number> }, controller: TransitionState<IGuest, { opacity: number }>
    }) => {
        const room = useSelector(getRoom)
        const guests = room.guests
        const pos = SEATS[Math.max(guests.length, index + 1)][index]

        useEffect(() => {
            controller.ctrl.start()
        }, [])

        return <animated.View
            key={index}
            style={[styles.userWrapper, style, { ...pos }]}
        >
            <Text style={styles.userName}>{guest.name}</Text>
            <View style={styles.userScoreWrapper}>
                <Text style={styles.userScore}>{1}</Text>
            </View>
        </animated.View>
    }

    return (
        <View style={styles.table}>
            <View style={styles.innerTable}>
                <View style={styles.innerLine}>
                    <View style={[styles.innerLine, styles.innerLineSmall]}>
                        <Text style={styles.innerText}>Scrum Poker</Text>
                    </View>
                </View>
            </View>
            {transitions((style, guest, controller, index) => (
                <Guest style={style} guest={guest} controller={controller} index={index} />
            ))}
        </View>
    );
}

export { Table };


const styles = StyleSheet.create({
    table: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c8d1df',
        width: windowHeight * 0.35,
        height: windowHeight * 0.6,
        borderRadius: windowHeight * 0.2
    },
    innerTable: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a5b4cb',
        width: '88%',
        height: '93%',
        borderRadius: windowHeight * 0.2
    },
    innerLine: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '92%',
        height: '96%',
        borderRadius: windowHeight * 0.2,
        borderColor: '#c8d1df',
        borderWidth: 1,
    },
    innerLineSmall: {
        borderRadius: windowHeight * 0.2,
        borderColor: '#c8d1df',
        width: '98%',
        height: '99%',
    },
    innerText: {
        width: 290,
        fontSize: 48,
        transform: [{ rotate: '-90deg' }],
        color: '#d3dae6'
    },
    // <------ Guest ------>
    userWrapper: {
        position: 'absolute',
        width: windowHeight * 0.3,
        height: windowHeight * 0.3,
        transform: [
            { translateY: -windowHeight * 0.15 },
            { translateX: windowHeight * 0.15 }
        ],
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },
    userName: {
        marginBottom: windowHeight * 0.005,
        fontSize: windowHeight * 0.02,
        color: '#4B536A',
        textAlign: 'center',
        fontWeight: '500'
    },
    userScoreWrapper: {
        width: windowHeight * 0.05,
        height: windowHeight * 0.05,
        borderRadius: 12,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 50px 0px rgba(0, 0, 0, 0.2)',
        shadowColor: '#0000005d',
        elevation: 5,
    },
    userScore: {
        fontSize: windowHeight * 0.02,
        color: '#4B536A',
    },
});
