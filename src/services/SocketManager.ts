import io, { Socket } from 'socket.io-client';
import { store } from '../../store';

const uri = 'http://localhost:8001'

class SocketManager {
    static status: Socket;
    static Events: StatusEvent[];

    static connect() {
        return new Promise<Socket>((resolve, reject) => {
            if (this.status && this.status.connected) {
                return resolve(this.status)
            }

            const status = io(uri)
            status.on('connect', () => {

                console.log('connection successful')
                this.status = status
                resolve(status)
            })
        })


    }


    static createRoom(payload: CreateRoomProps) {
        return new Promise<CreateRoomResponse>(async (resolve, reject) => {
            const status = await this.connect()
            const callback = (response: CreateRoomResponse) => {
                console.log('room_created', response)
                this.subscribe(status)
                resolve(response)
            }

            status.emit('create_room', payload, callback)
        })
    }


    static joinRoom(payload: JoinRoomProps) {
        return new Promise<JoinRoomResponse>(async (resolve, reject) => {
            const status = await this.connect()
            const callback = (response: JoinRoomResponse) => {
                console.log('room_joined', response)
                this.subscribe(status)
                resolve(response)
            }

            status.emit('join_room', payload, callback)
        })
    }

    static closeRoom(payload: CloseRoomProps) {
        return new Promise<CloseRoomResponse>(async (resolve, reject) => {
            const status = await this.connect()
            const callback = (response: CloseRoomResponse) => {
                console.log('room_closed', response)
                this.unsubscribe(status)
                resolve(response)
            }

            status.emit('close_room', payload, callback)
        })
    }


    static async vote(payload: VoteProps) {
        return new Promise<VoteResponse>(async (resolve, reject) => {
            const status = await this.connect()
            const callback = (response: VoteResponse) => {
                console.log('vote', { payload, response })
                resolve(response)
            }

            status.emit('vote', payload, callback)
        })

    }

    static subscribe(status: Socket) {
        this.Events = [
            { name: 'guest_joined', handler: store.dispatch.room.onGuestJoined },
            { name: 'guest_left', handler: store.dispatch.room.onGuestLeave },
            // { name: 'room_vote', handler: store.dispatch.room.onVoteUpdate },
            // { name: 'next_round', handler: store.dispatch.room.onNextRound },
            // { name: 'options_changed', handler: store.dispatch.room.optionsChanged },
            // { name: 'room_closed', handler: store.dispatch.room.roomDismissed },
        ]

        this.Events.forEach((event: StatusEvent) => status.on(event.name, event.handler))
    }

    static unsubscribe(status: Socket) {
        this.Events.forEach((event: StatusEvent) => status.off(event.name))
    }

}

export default SocketManager