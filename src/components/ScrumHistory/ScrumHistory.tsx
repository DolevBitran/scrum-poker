import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../Text';

interface IScrumHistoryProps {
    onCreateRoomPressed: () => void;
}


const ScrumHistory: React.FC<IScrumHistoryProps> = ({ onCreateRoomPressed }) => {
    const scrumsHistory = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const renderScrumHistory = (item: number, index: number) => (
        <View style={styles.historyScrumContainer} key={index}>
            <Text style={styles.historyScrumHeader}>Item {index}</Text>
        </View>
    )

    return (<>
        <View style={styles.sectionHeaderWrapper}>
            <Text style={styles.sectionHeader}>Last Scrums</Text>
            <TouchableOpacity onPress={onCreateRoomPressed} >
                <Text style={styles.sectionHeaderAction}>Create +</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1, width: '100%', marginTop: 30 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                bounces={false}>
                {scrumsHistory.map(renderScrumHistory)}
            </ScrollView>
        </View>
    </>);
}

export { ScrumHistory }

const styles = StyleSheet.create({
    sectionHeaderWrapper: {
        paddingHorizontal: 40,
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionHeader: {
        alignSelf: 'flex-start',
        fontSize: 24,
        color: '#4B536E',
        fontWeight: 'bold',
    },
    sectionHeaderAction: {
        color: '#A5B4CB',
        fontWeight: '600'
    },
    historyScrumContainer: {
        boxShadow: '-8px 14px 150px 19px rgba(0, 0, 0, 0.05)',
        shadowColor: '#b7b7b7',
        elevation: 20,
        height: 75,
        marginHorizontal: 40,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 16,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    historyScrumHeader: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
        color: '#4B536E',
        fontWeight: 'bold'
    }
});




