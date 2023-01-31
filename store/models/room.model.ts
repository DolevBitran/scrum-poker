import { createModel, RematchDispatch } from '@rematch/core';
// import { POST } from '../../service/api';
import { RootModel } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io, { Socket } from 'socket.io-client';
import { Dispatch } from '..';

// const socket = io('http://localhost:4000');

export type Guest = {
    id: string;
    name: string;
}

export type Vote = number

export type Round = {
    [id: string]: Vote
}

export type RoomOptions = {
}

export type Room = {
    id: string;
    guests: Guest[];
    name: string;
    options: RoomOptions;
}

export type RoomState = {
    id: string | null;
    socket: Socket | null;
    participates: Guest[];
    rounds: Round[]
}

const INITIAL_STATE: RoomState = {
    id: null,
    socket: null,
    participates: [],
    rounds: [],
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
        SET_ROOM_ID: (state: RoomState, payload: RoomState['id']): RoomState => ({ ...state, id: payload }),
        SET_ROOM_SOCKET: (state: RoomState, payload: RoomState['socket']): RoomState => ({ ...state, socket: payload }),
        APPEND_PARTICIPATE: (state: RoomState, payload: Guest): RoomState => ({ ...state, participates: [...state.participates, payload] }),
        REMOVE_PARTICIPATE: (state: RoomState, payload: Guest['id']): RoomState => ({ ...state, participates: state.participates.filter(guest => guest.id !== payload) }),
    },
    effects: (dispatch: Dispatch) => ({
        async test(payload: RoomState['id']) {
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 5000)
            })
            return 'succsesssss!'
        },
        async create(payload: CreateRoomProps, state: RootModel) {
            const socket = state.room.socket || io("http://localhost:8001");
            socket.on('connect', () => {
                console.log('connection successful')
                this.SET_ROOM_SOCKET(socket)
                socket.emit('room:create', payload, dispatch.room.onCreated)
            })
            return state.room.id
        },
        async join(payload: JoinRoomProps, state: RootModel) {
            const socket = state.room.socket || io("http://localhost:8001");
            socket.on('connect', () => {
                this.SET_ROOM_SOCKET(socket)
                socket.emit('room:join', payload)
                socket.on('room:joined', dispatch.room.onJoined)
            })
            return state.room.id
        },
        async initializeRoom(payload: initializeRoomProps, state: RootModel) {
            const { room, admin_secret } = payload
            console.log('initializing room', { room, admin_secret })
            const socket = state.room.socket
            socket.on('room:participates', dispatch.room.onParticipatesUpdate)
            socket.on('room:vote', dispatch.room.onVoteUpdate)
            socket.on('room:next', dispatch.room.onNextRound)
            socket.on('room:options', dispatch.room.optionsChanged)
            socket.on('room:close', dispatch.room.roomDismissed)

            const room_id = room.id
            const guest_id = room.guests[0].id
            // const admin_secret = JSON.stringify(payload.admin_id)

            this.SET_ROOM_ID(room_id)

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
            console.log('room:created', payload)
            dispatch.room.initializeRoom({ room: payload.room, admin_secret: payload.hostId })
        },
        onJoined(payload: { hostId: string, guestId: string, room: Room }, state: RootModel) {
            const { room, guestId, hostId } = payload
            dispatch.room.initializeRoom({ room })
        },
        onParticipatesUpdate(payload: JoinRoomProps, state: RootModel) {
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