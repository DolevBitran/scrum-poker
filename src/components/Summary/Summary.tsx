import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { getCurrentRound, getRoom, getSummaryTableData } from '../../../store/selectors/room.selector';
import { useSelector } from 'react-redux';
import Text from '../Text';
import { useTransition, config, TransitionState } from '@react-spring/native';
import SEATS from '../../Seats';
import { animated, SpringValue } from '@react-spring/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type ISummaryProps = {
}

const Summary: React.FC<ISummaryProps> = ({ }) => {
    const room = useSelector(getRoom)
    const currentRound = useSelector(getCurrentRound)
    const summaryData = useSelector(getSummaryTableData)
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
        const guestScore = currentRound[guest.id] || ''
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
                <Text style={styles.userScore}>{guestScore}</Text>
            </View>
        </animated.View>
    }

    const ValueTableCell = ({ vote, index }: { vote: Vote, index: number }) => <Text style={styles.summaryTableValueCell}>{vote}</Text>
    const GuestTableHead = (guest: IGuest) => <Text key={guest.id} style={styles.summaryTableHeadRow}>{guest.name}</Text>
    const GuestTableRow = (guest: IGuest) => <View style={styles.summaryTableValuesRow} key={`${guest.id}-row`}>
        {summaryData[guest.id].map((vote, index) => <ValueTableCell key={`${guest.id}-${index}`} vote={vote} index={index} />)}
    </View>

    return (
        <View style={styles.summary}>
            {/* <Text>Room ID xxx-xxx</Text> */}
            <View style={styles.summaryTable}>
                <View style={styles.summaryTableHeads}>
                    {guests.map(GuestTableHead)}
                </View>
                <ScrollView
                    style={styles.summaryTableValues}
                    horizontal={true}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 12 }}
                    showsHorizontalScrollIndicator={true}>
                    <View>
                        {guests.map(GuestTableRow)}
                    </View>
                </ScrollView>
            </View>
        </View >
    );
}

export { Summary };


const styles = StyleSheet.create({
    summary: {
        flex: 1,
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: windowHeight * 0.6,
        width: '80%'
    },
    summaryTable: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    summaryTableHeads: {
        marginRight: 20
    },
    summaryTableHeadRow: {
        color: '#4B536A',
        fontWeight: 500,
        fontSize: 16,
        marginVertical: 10
    },
    summaryTableValues: {
    },
    summaryTableValuesRow: {
        flexDirection: 'row',
        marginVertical: 10
    },
    summaryTableValueCell: {
        color: '#cbcdd4',
        width: '30px',
        textAlign: 'center',
        fontSize: 16
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
