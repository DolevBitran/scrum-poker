import { createModel } from '@rematch/core';
import { RootModel } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from '..';
import { CommonActions } from '@react-navigation/native';
import SocketManager from '../../src/services/SocketManager';
import { ROOM_MODE } from '../../src/constants/constants';

const INITIAL_STATE: RoomState = {
    navigator: null,
    socket: null,
    id: null,
    name: null,
    guests: [],
    roundsHistory: [],
    currentRound: {},
    options: {},
    guestName: '',
    selectedCardIndex: null,
};

export const room: any = createModel<RootModel>()({
    name: 'room',
    state: INITIAL_STATE,
    reducers: {
        SET_ROOM: (state: RoomState, payload: IRoom): RoomState => ({
            ...state,
            id: payload.id,
            name: payload.name,
            guests: payload.guests,
            roundsHistory: payload.roundsHistory,
            currentRound: payload.currentRound || [],
            options: {
                ...payload.options,
                // TODO: remove this once we can get a deck from the server
                deck: [
                    { displayName: 'xs', value: 3 },
                    { displayName: 'm', value: 5 },
                    { displayName: 'xl', value: 10 },
                ],
            },
        }),
        SET_ROOM_SOCKET: (state: RoomState, payload: RoomState['socket']): RoomState => ({ ...state, socket: payload }),
        SET_GUEST: (state: RoomState, payload: IGuest): RoomState => ({
            ...state,
            guests: [...state.guests.filter(guest => guest.id !== payload.id), payload]
        }),
        // APPEND_GUEST: (state: RoomState, payload: IGuest): RoomState => ({ ...state, guests: [...state.guests, payload] }),
        // REMOVE_GUEST: (state: RoomState, payload: IGuest['id']): RoomState => ({
        //     ...state,
        //     guests: state.guests.filter((guest) => guest.id !== payload),
        // }),
        APPEND_VOTE: (state: RoomState, payload: { guestId: IGuest['id'], value: number }): RoomState => ({ ...state, currentRound: { ...state.currentRound, [payload.guestId]: payload.value } }),
        NEW_ROUND: (state: RoomState, payload: IRound): RoomState => ({ ...state, roundsHistory: [...state.roundsHistory, payload], currentRound: {} }),
        SET_NAVIGATOR: (state: RoomState, payload: RoomState['navigator']): RoomState => ({ ...state, navigator: payload }),
        SET_GUEST_NAME: (state: RoomState, payload: RoomState['guestName']): RoomState => ({
            ...state,
            guestName: payload,
        }),
        SET_SELECTED_CARD_INDEX: (state: RoomState, payload: RoomState['selectedCardIndex']) => ({
            ...state,
            selectedCardIndex: payload,
        }),
    },
    effects: (dispatch: Dispatch) => ({
        async init(payload: RoomState['navigator'], state: RootModel) {
            const guestName = await AsyncStorage.getItem('guest_name');
            this.SET_NAVIGATOR(payload);
            this.SET_GUEST_NAME(guestName);

            return state.room.navigator;
        },
        async create(payload: CreateRoomProps, state: RootModel) {
            try {
                dispatch.room.setName(payload.hostName);
                const response = await SocketManager.createRoom(payload);
                console.log(response)
                await dispatch.room.initializeRoom({ ...response, guestId: response.hostId });
                return state.room.id;
            } catch (err) {
                console.error(err);
            }
        },
        async join(payload: JoinRoomProps, state: RootModel) {
            try {
                const [[_, lastRoomId], [__, guestId]] = await AsyncStorage.multiGet(['room_id', 'guest_id']);
                if (guestId && lastRoomId === payload.id) {
                    payload.guestId = guestId;
                }
                dispatch.room.setName(payload.guestName);
                const response = await SocketManager.joinRoom(payload);
                // console.log(response.room)
                await dispatch.room.initializeRoom({ room: response.room, guestId: response.guestId });
                return state.room.id;
            } catch (err) {
                console.error(err);
            }
        },
        // @TODO remove reconnect and use join
        async reconnect(payload: JoinRoomProps, state: RootModel) {
            try {
                const guestId = await AsyncStorage.getItem('guest_id')
                return await dispatch.room.join({ ...payload, guestName: state.room.guestName, guestId })
                // @TODO: handle simultaneous connections to same guest
            } catch (err) {
                console.error(err);
            }
        },
        async initializeRoom(payload: initializeRoomProps, state: RootModel) {
            const { room, admin_secret } = payload;
            console.log('initializing room', { room, admin_secret });
            this.SET_ROOM(room);

            const room_id = room.id;
            const guest_id = payload.guestId;
            const room_data: [string, string][] = [
                ['room_id', room_id],
                ['guest_id', guest_id],
            ];

            if (admin_secret) {
                room_data.push(['admin_secret', admin_secret]);
            }
            await AsyncStorage.multiSet(room_data);
            state.room.navigator.dispatch(CommonActions.navigate({ name: 'Room' }));
        },
        async vote(payload: VoteProps, state: RootModel) {
            try {
                this.SET_SELECTED_CARD_INDEX(payload);
                await SocketManager.vote(payload);
            } catch (err) {
                console.error(err);
                throw err;
            }
            return true;
        },
        async startNextRound(payload: NextRoundProps, state: RootModel) {
            try {
                const response = await SocketManager.startNextRound(payload)
                console.log(response)
            } catch (err) {
                console.error(err);
                throw err;
            }
            return true;
        },
        onGuestJoined(payload: { roomId: IRoom['id'], guest: IGuest }, state: RootModel) {
            console.log('guest_joined', payload);
            if (state.room.id === payload.roomId) {
                this.SET_GUEST(payload.guest);
            }
        },
        onGuestLeave(payload: { roomId: IRoom['id'], guest: IGuest }, state: RootModel) {
            console.log('guest_left', payload);
            if (state.room.id === payload.roomId) {
                this.SET_GUEST(payload.guest);
            }
        },
        onVoteUpdate(payload: { guestId: IGuest['id'], roomId: IRoom['id'], value: number }, state: RootModel) {
            this.APPEND_VOTE(payload)
        },
        onNextRound(payload: { lastRound: IRound }, state: RootModel) {
            console.log('next_round', payload)
            this.NEW_ROUND(payload.lastRound)
        },
        onOptionsChanged(payload: VoteProps, state: RootModel) { },
        onRoomClosed(payload: VoteProps, state: RootModel) {
            SocketManager.unsubscribe()
            dispatch.app.setRoomMode(ROOM_MODE.TABLE)
        },
        async setName(payload: string, state: RootModel) {
            if (state.room.guestName !== payload) {
                await AsyncStorage.setItem('guest_name', payload);
                this.SET_GUEST_NAME(payload);
            }
            return state.room.guestName;
        },
    }),
});
