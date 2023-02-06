import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { getDeck, getRoom, getSelectedCardIndex } from '../../../store/selectors/room.selector';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../Text';
import SEATS from '../../Seats';
import { useTransition, animated, config, SpringValue } from '@react-spring/native';
import BottomSheet from '../BottomSheet';
import { BottomSheetRefProps } from '../BottomSheet/BottomSheet';
import { Dispatch } from '../../../store';
import Card from '../Card';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type IVoteKeyboardProps = {
}

const VoteKeyboard: React.FC<IVoteKeyboardProps> = () => {
    const bottomSheetRef = React.useRef<BottomSheetRefProps>(null)
    const room = useSelector(getRoom)
    const deck = useSelector(getDeck)
    const roomSelectedCardIndex = useSelector(getSelectedCardIndex)
    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        bottomSheetRef.current && bottomSheetRef.current.scrollTo(0.3)
    }, [bottomSheetRef.current])

    return <BottomSheet ref={bottomSheetRef} snapPoints={[0.3]}>
        <View style={styles.cardsContainer}>
            {(deck || []).map((card: ICard, index: number) => <Card key={card.value} card={card} index={index} />)}
        </View>
    </BottomSheet>
}

export { VoteKeyboard };


const styles = StyleSheet.create({
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        flexWrap: 'wrap'
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: 'green'
    }
});
