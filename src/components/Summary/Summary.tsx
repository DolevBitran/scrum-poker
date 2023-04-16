import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { getRoom, getSummaryTableData } from '../../../store/selectors/room.selector';
import { useSelector } from 'react-redux';
import Text from '../Text';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type ISummaryProps = {
}

const Summary: React.FC<ISummaryProps> = ({ }) => {
    const room = useSelector(getRoom)
    const summaryData = useSelector(getSummaryTableData)
    const guests = room.guests

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
});
