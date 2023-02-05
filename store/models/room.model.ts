import { createModel, RematchDispatch } from '@rematch/core';
// import { POST } from '../../service/api';
import { RootModel } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io, { Socket } from 'socket.io-client';
import { Dispatch } from '..';
import { CommonActions, NavigationContainerProps, NavigationContainerRef } from '@react-navigation/native';
import { HOME_ROUTES } from '../../src/routes/HomeStack';
import SocketManager from '../../src/services/SocketManager';

const INITIAL_STATE: RoomState = {
    navigator: null,
    socket: null,
    id: null,
    name: null,
    guests: [],
    roundsHistory: [],
    options: {},
    guestName: '',
    selectedCardIndex: null,
};

export const room: any = createModel<RootModel>()({
    name: 'room',
    state: INITIAL_STATE,
    reducers: {
        SET_ROOM: (state: RoomState, payload: Room): RoomState => ({
            ...state,
            id: payload.id,
            name: payload.name,
            guests: payload.guests,
            roundsHistory: payload.roundsHistory,
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
        APPEND_GUEST: (state: RoomState, payload: Guest): RoomState => ({ ...state, guests: [...state.guests, payload] }),
        REMOVE_GUEST: (state: RoomState, payload: Guest['id']): RoomState => ({
            ...state,
            guests: state.guests.filter((guest) => guest.id !== payload),
        }),
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
                await dispatch.room.initializeRoom(response);
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
                await dispatch.room.initializeRoom({ room: response.room });
                return state.room.id;
            } catch (err) {
                console.error(err);
            }
        },
        async initializeRoom(payload: initializeRoomProps, state: RootModel) {
            const { room, admin_secret } = payload;
            console.log('initializing room', { room, admin_secret });
            this.SET_ROOM(room);

            const room_id = room.id;
            const guest_id = room.guests[0].id;
            const room_data: [string, string][] = [
                ['room_id', room_id],
                ['guest_id', guest_id],
            ];

            if (admin_secret) {
                room_data.push(['admin_secret', admin_secret]);
            }
            await AsyncStorage.multiSet(room_data);
            state.room.navigator.dispatch(CommonActions.navigate({ name: HOME_ROUTES.TABLE }));
        },
        async vote(payload: VoteProps, state: RootModel) {
            try {
                this.SET_SELECTED_CARD_INDEX(payload);
                SocketManager.vote(payload);
            } catch (err) {
                console.error(err);
                throw err;
            }
            return true;
        },
        onGuestJoined(payload: { roomId: Room['id']; guest: Guest }, state: RootModel) {
            console.log('guest_joined', payload);
            if (state.room.id === payload.roomId) {
                this.APPEND_GUEST(payload.guest);
            }
        },
        onGuestLeave(payload: { roomId: Room['id']; guestId: Guest['id'] }, state: RootModel) {
            console.log('guest_left', payload);
            if (state.room.id === payload.roomId) {
                this.REMOVE_GUEST(payload.guestId);
            }
        },
        onVoteUpdate(payload: VoteProps, state: RootModel) { },
        onNextRound(payload: VoteProps, state: RootModel) { },
        onOptionsChanged(payload: VoteProps, state: RootModel) { },
        onRoomClosed(payload: VoteProps, state: RootModel) { },
        async setName(payload: string, state: RootModel) {
            if (state.room.guestName !== payload) {
                await AsyncStorage.setItem('guest_name', payload);
                this.SET_GUEST_NAME(payload);
            }
            return state.room.guestName;
        },
    }),
});
