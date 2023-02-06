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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type ICardProps = {
    card: ICard;
    index: number;
}

const Card: React.FC<ICardProps> = ({ card, index }) => {
    const room = useSelector(getRoom)
    const deck = useSelector(getDeck)
    const roomSelectedCardIndex = useSelector(getSelectedCardIndex)
    const dispatch = useDispatch<Dispatch>()

    const onVote = async () => {
        dispatch.room.vote({ roomId: room.id, value: card.value });
    }

    const getCardStyle = () => {
        if (index === roomSelectedCardIndex) {
            return [styles.cardContainer, styles.selectedCard]
        }
        return styles.cardContainer
    }

    return (
        <View style={{ width: windowWidth / 5 }} key={index}>
            <TouchableOpacity style={getCardStyle()} onPress={onVote} >
                <Text>{card.displayName}</Text>
            </TouchableOpacity>
        </View >
    )
}

export { Card };


const styles = StyleSheet.create({
    cardContainer: {
        padding: 20,
        backgroundColor: "orange"
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: 'green'
    }
});
