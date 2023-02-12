import io, { Socket } from 'socket.io-client';
import { store } from '../../store';

const uri = 'http://localhost:8001'

class SocketManager {
    static socket: Socket;
    static Events: SocketEvent[];

    static connect() {
        return new Promise<Socket>((resolve, reject) => {
            if (this.socket && this.socket.connected) {
                return resolve(this.socket)
            }

            const socket = io(uri)
            socket.on('connect', () => {
                console.log('connection successful')
                this.socket = socket
                resolve(socket)
            })
        })
    }

    static createRoom(payload: CreateRoomProps) {
        return new Promise<CreateRoomResponse>(async (resolve, reject) => {
            const socket = await this.connect()
            const callback = (response: CreateRoomResponse) => {
                console.log('room_created', response)
                this.subscribe()
                resolve(response)
            }

            socket.emit('create_room', payload, callback)
        })
    }

    static joinRoom(payload: JoinRoomProps) {
        return new Promise<JoinRoomResponse>(async (resolve, reject) => {
            const socket = await this.connect()
            const callback = (response: JoinRoomResponse) => {
                console.log('room_joined', response)
                this.subscribe()
                resolve(response)
            }

            socket.emit('join_room', payload, callback)
        })
    }

    static closeRoom(payload: CloseRoomProps) {
        return new Promise<CloseRoomResponse>(async (resolve, reject) => {
            const socket = await this.connect()
            const callback = (response: CloseRoomResponse) => {
                console.log('room_closed', response)
                this.unsubscribe()
                resolve(response)
            }

            socket.emit('close_room', payload, callback)
        })
    }

    static async vote(payload: VoteProps) {
        return new Promise<VoteResponse>(async (resolve, reject) => {
            const socket = await this.connect()
            const callback = (response: VoteResponse) => {
                console.log('vote', { payload, response })
                resolve(response)
            }

            socket.emit('vote', payload, callback)
        })
    }

    static async startNextRound(payload: NextRoundProps) {
        return new Promise<NextRoundResponse>(async (resolve, reject) => {
            const socket = await this.connect()
            const callback = (response: NextRoundResponse) => {
                resolve(response)
            }
            socket.emit('next_round', payload, callback)
        })
    }

    static subscribe() {
        this.Events = [
            { name: 'guest_joined', handler: store.dispatch.room.onGuestJoined },
            { name: 'guest_left', handler: store.dispatch.room.onGuestLeave },
            { name: 'guest_voted', handler: store.dispatch.room.onVoteUpdate },
            { name: 'next_round', handler: store.dispatch.room.onNextRound },
            // { name: 'options_changed', handler: store.dispatch.room.optionsChanged },
            // { name: 'room_closed', handler: store.dispatch.room.roomDismissed },
        ]

        this.Events.forEach((event: SocketEvent) => this.socket.on(event.name, event.handler))
    }

    static unsubscribe() {
        this.Events.forEach((event: SocketEvent) => this.socket.off(event.name))
    }

}

export default SocketManager