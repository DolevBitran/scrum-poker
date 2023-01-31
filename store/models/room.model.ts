import { createModel, RematchDispatch } from '@rematch/core';
// import { POST } from '../../service/api';
import { RootModel } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io, { Socket } from 'socket.io-client';
import { Dispatch } from '..';
import { CommonActions, NavigationContainerProps, NavigationContainerRef } from '@react-navigation/native';
import { HOME_ROUTES } from '../../src/routes/HomeStack';

// const socket = io('http://localhost:4000');

export type Guest = {
    id: string;
    name: string;
}

export type Vote = number

export type Round = {
    [guestId: string]: Vote
}

export type RoomOptions = {
}

export type Room = {
    id: string;
    name: string;
    guests: Guest[];
    roundsHistory: Round[],
    options: RoomOptions;
}

export type RoomState = {
    navigator: NavigationContainerRef<{ Home: unknown; Table: unknown; }> | null;
    socket: Socket | null;
    id: string | null;
    name: string | null;
    guests: Guest[];
    roundsHistory: Round[],
    options: RoomOptions
}

const INITIAL_STATE: RoomState = {
    navigator: null,
    socket: null,
    id: null,
    name: null,
    guests: [],
    roundsHistory: [],
    options: {}
}

type CreateRoomProps = {
    hostName: string;
    roomName: string;
}

type JoinRoomProps = {
    id: RoomState['id'];
    name: Guest['name'];
}

type initializeRoomProps = {
    room: Room;
    admin_secret: string;
}

type VoteProps = {

}

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
            options: payload.options
        }),
        SET_ROOM_SOCKET: (state: RoomState, payload: RoomState['socket']): RoomState => ({ ...state, socket: payload }),
        APPEND_GUEST: (state: RoomState, payload: Guest): RoomState => ({ ...state, guests: [...state.guests, payload] }),
        REMOVE_GUEST: (state: RoomState, payload: Guest['id']): RoomState => ({ ...state, guests: state.guests.filter(guest => guest.id !== payload) }),
        SET_NAVIGATOR: (state: RoomState, payload: RoomState['navigator']): RoomState => ({ ...state, navigator: payload }),
    },
    effects: (dispatch: Dispatch) => ({
        async init(payload: RoomState['navigator'], state: RootModel) {
            this.SET_NAVIGATOR(payload)
            return state.room.navigator
        },
        async test(payload: RoomState['id']) {
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 5000)
            })
            return 'success!'
        },
        async create(payload: CreateRoomProps, state: RootModel) {
            const socket = state.room.socket || io("http://localhost:8001");
            socket.on('connect', () => {
                console.log('connection successful')
                this.SET_ROOM_SOCKET(socket)
                socket.emit('create_room', payload, dispatch.room.onCreated)
            })
            return state.room.id
        },
        async join(payload: JoinRoomProps, state: RootModel) {
            const socket: Socket = state.room.socket || io("http://localhost:8001");
            socket.on('connect', () => {
                console.log('connection successful')
                this.SET_ROOM_SOCKET(socket)
                socket.emit('join_room', payload, dispatch.room.onJoined)
            })
            return state.room.id
        },
        async initializeRoom(payload: initializeRoomProps, state: RootModel) {
            const { room, admin_secret } = payload
            console.log('initializing room', { room, admin_secret })
            this.SET_ROOM(room)

            state.room.navigator.dispatch(CommonActions.navigate({ name: HOME_ROUTES.TABLE }))

            state.room.socket.on('guest_joined', dispatch.room.onGuestJoined)
            state.room.socket.on('guest_left', dispatch.room.onGuestLeave)
            // state.room.socket.on('room:vote', dispatch.room.onVoteUpdate)
            // state.room.socket.on('room:next', dispatch.room.onNextRound)
            // state.room.socket.on('room:options', dispatch.room.optionsChanged)
            // state.room.socket.on('room:close', dispatch.room.roomDismissed)

            const room_id = room.id
            const guest_id = room.guests[0].id
            // const admin_secret = JSON.stringify(payload.admin_id)

            const room_data: [string, string][] = [
                ['room_id', room_id],
                ['guest_id', guest_id]
            ]

            if (admin_secret) {
                room_data.push(['admin_secret', admin_secret])
            }
            await AsyncStorage.multiSet(room_data)
        },
        async vote(payload: VoteProps, state: RootModel) {
            try {
                // socket.emit('vote', payload)
                // vote room - id,user,value
            } catch (err) {
                console.error(err)
                throw err
            }
            return true
        },
        onCreated(payload: { id: Room['id'], hostId: string, admin_secret?: string, room: Room }, state: RootModel) {
            // const { room, admin_secret, hostId } = payload
            // id, name, guests, adminId, roundsHistory, options
            console.log('room_created', payload)
            dispatch.room.initializeRoom({ room: payload.room, admin_secret: payload.hostId })
        },
        onJoined(payload: { hostId: string, guestId: string, room: Room }, state: RootModel) {
            console.log('room_joined', payload)
            dispatch.room.initializeRoom({ room: payload.room })
        },
        onGuestJoined(payload: { roomId: Room['id'], guest: Guest }, state: RootModel) {
            console.log('guest_joined', payload)
            if (state.room.id === payload.roomId) {
                this.APPEND_GUEST(payload.guest)
            }
        },
        onGuestLeave(payload: { roomId: Room['id'], guestId: Guest['id'] }, state: RootModel) {
        },
        onVoteUpdate(payload: VoteProps, state: RootModel) {

        },
        onNextRound(payload: VoteProps, state: RootModel) {
        },
        onOptionsChanged(payload: VoteProps, state: RootModel) {
        },
        onRoomClosed(payload: VoteProps, state: RootModel) {

        },
    }),
});