import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconButton from '../IconButton';
import { Dispatch } from '../../../store';
import { getRoomMode } from '../../../store/selectors/app.selector';
import { ROOM_MODE } from '../../constants/constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type IRoomToolbarProps = {
}

const RoomToolbar: React.FC<IRoomToolbarProps> = ({ }) => {
    const dispatch = useDispatch<Dispatch>()
    const roomMode = useSelector(getRoomMode)

    const onToggleRoomMode = () => {
        dispatch.app.setRoomMode(roomMode === ROOM_MODE.TABLE ? ROOM_MODE.SUMMARY : ROOM_MODE.TABLE)
    }

    return (
        <View style={styles.bottomHeader}>
            <TouchableOpacity onPress={onToggleRoomMode} >
                <IconButton style={{ alignSelf: 'flex-start' }}>
                    <Feather name="clipboard" size={24} color="#2C416F" />
                </IconButton>
            </TouchableOpacity>
        </View>
    );
}

export { RoomToolbar };


const styles = StyleSheet.create({
    bottomHeader: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
});
