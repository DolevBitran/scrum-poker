import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { HeaderTitle } from './HeaderTitle';
import { HeaderActionsContainer } from './HeaderActionsContainer';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type HeaderActionType = { icon: JSX.Element; onPress?: () => void; onLongPress?: () => void; }

export type IUpperHeaderProps = {
    headerText: string | null;
    leftHeaderAction: HeaderActionType | null;
    rightHeaderAction: HeaderActionType | null;
}

const UpperHeader: React.FC<IUpperHeaderProps> = ({ leftHeaderAction, rightHeaderAction, headerText }) => {

    return (
        <View style={styles.upperHeader}>
            <HeaderActionsContainer style={{ alignContent: 'flex-start' }} icon={leftHeaderAction?.icon} onPress={leftHeaderAction?.onPress} />
            {headerText && <HeaderTitle title={headerText} />}
            <HeaderActionsContainer style={{ alignContent: 'flex-end' }} icon={rightHeaderAction?.icon} onPress={rightHeaderAction?.onPress} />
        </View>
    );
}

export { UpperHeader };


const styles = StyleSheet.create({
    upperHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
