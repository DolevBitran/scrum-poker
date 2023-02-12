import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { getDeck, getIsAllGuestsVoted, getRoom, getCurrentRound } from '../../../store/selectors/room.selector';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetRefProps } from '../BottomSheet/BottomSheet';
import { Dispatch } from '../../../store';

import BottomSheet from '../BottomSheet';
import Text from '../Text';
import Card from '../Card';
import Modal from '../Modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type IVoteKeyboardProps = {
}

const VoteKeyboard: React.FC<IVoteKeyboardProps> = () => {
    const bottomSheetRef = React.useRef<BottomSheetRefProps>(null)
    const room = useSelector(getRoom)
    const deck = useSelector(getDeck)
    const currentRound = useSelector(getCurrentRound)
    const isAllGuestsVoted = useSelector(getIsAllGuestsVoted)
    const shouldDisableNextRound = !Object.values(currentRound).length
    const dispatch = useDispatch<Dispatch>()
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        bottomSheetRef.current && bottomSheetRef.current.scrollTo(0.35)
    }, [bottomSheetRef.current])

    const onStartNextRound = () => {
        if (isAllGuestsVoted) {
            dispatch.room.startNextRound({ roomId: room.id })
        } else {
            setVisible(true)
        }
    }

    const onAccept = () => {
        dispatch.room.startNextRound({ roomId: room.id })
        setVisible(false)
    }

    const onCancel = () => {
        setVisible(false)
    }

    const getNextRoundBtnStyle = () => {
        if (shouldDisableNextRound) {
            return [styles.nextRoundBtn, styles.nextRoundBtnDisabled]
        }
        return styles.nextRoundBtn
    }
    const getNextRoundBtnTextStyle = () => {
        if (shouldDisableNextRound) {
            return [styles.nextRoundBtnText, styles.nextRoundBtnTextDisabled]
        }
        return styles.nextRoundBtnText
    }

    return <BottomSheet ref={bottomSheetRef} snapPoints={[0.35]}>
        {/* ToolBar */}
        <View style={styles.toolbarContainer}>
            <TouchableOpacity style={getNextRoundBtnStyle()} onPress={onStartNextRound} disabled={shouldDisableNextRound}>
                <Text style={getNextRoundBtnTextStyle()}>Next Round</Text>
            </TouchableOpacity>
        </View>
        {/* Cards */}
        <View style={styles.cardsContainer}>
            {(deck || []).map((card: ICard, index: number) => <Card key={card.value} card={card} index={index} />)}
        </View>
        {/* Modal */}
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={console.log}>
            <Text>Are you sure you want to call next round ?</Text>
            <Text>x participates haven't vote yet.</Text>
            <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.nextRoundBtn, { marginRight: 10 }]} onPress={onAccept}>
                    <Text style={styles.nextRoundBtnText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextRoundBtn} onPress={onCancel}>
                    <Text style={styles.nextRoundBtnText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>

    </BottomSheet >
}

export { VoteKeyboard };


const styles = StyleSheet.create({
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: 'green'
    },

    toolbarContainer: {
        paddingHorizontal: '10%',
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row'
    },
    nextRoundBtn: {
        borderColor: 'black',
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        paddingHorizontal: 4,
        paddingVertical: 1
    },
    nextRoundBtnDisabled: {
        borderColor: 'gray',
    },
    nextRoundBtnText: {
        fontSize: windowHeight * 0.02,
    },
    nextRoundBtnTextDisabled: {
        fontSize: windowHeight * 0.02,
        color: 'gray'
    },

    modalActions: {
        width: '100%',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});
