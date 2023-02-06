import React from 'react';
import { StyleSheet, View, Dimensions, I18nManager, Platform, ScrollView } from 'react-native';

import Text from '../Text';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface IActiveScrumsProps {
}


const ActiveScrums: React.FC<IActiveScrumsProps> = () => {
    const activeScrums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const renderActiveScrum = (_: number, index: number) => (
        <View style={styles.activeScrumContainer} key={index}>
            <Text style={styles.activeScrumHeader}>Item {index}</Text>
        </View>
    )

    return (<>
        <View style={styles.activeScrumsHeaderContainer}>
            <View style={styles.activeDot} />
            <Text style={styles.activeSectionHeader}>Active Scrums</Text>
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceVertical={false}
            alwaysBounceHorizontal={false}
            bounces={false}
            contentContainerStyle={{
                paddingLeft: 40,
                flexGrow: 0
            }}
            style={{ width: '100%', flexGrow: 0, marginVertical: 30, }}
        >
            {activeScrums.map(renderActiveScrum)}
        </ScrollView>
    </>);
}

export { ActiveScrums }

const styles = StyleSheet.create({
    activeSectionHeader: {
        marginLeft: 7,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        fontSize: 24,
        color: '#4B536E',
    },
    activeScrumsHeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 40,
        justifyContent: 'flex-start'
    },
    activeScrumContainer: {
        overflow: 'visible',
        height: 75,
        width: 154,
        backgroundColor: '#A5B4CB',
        borderRadius: 16,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeDot: {
        width: 7,
        height: 7,
        backgroundColor: '#7CEB6A',
        borderRadius: 50
    },
    activeScrumHeader: {
        fontSize: 20,
        color: '#ffffff',
    }
});




