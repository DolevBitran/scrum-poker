import io, { Socket } from 'socket.io-client';
import { store } from '../../store';

const uri = 'http://localhost:8001'

class Status {
    static status: Socket;
    static Events: StatusEvent[] = [
        { name: 'guest_joined', handler: store.dispatch.room.onGuestJoined },
        { name: 'guest_left', handler: store.dispatch.room.onGuestLeave },
        // { name: 'room:vote', handler: store.dispatch.room.onVoteUpdate },
        // { name: 'room:next', handler: store.dispatch.room.onNextRound },
        // { name: 'room:options', handler: store.dispatch.room.optionsChanged },
        // { name: 'room:close', handler: store.dispatch.room.roomDismissed },
    ]

    constructor(status: Socket) {
        // Status.status = status
    }

    static connect() {
        return new Promise<Socket>((resolve, reject) => {
            if (this.status && this.status.connected) {
                resolve(this.status)
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

    static subscribe(status: Socket) {
        Status.Events.forEach((event: StatusEvent) => status.on(event.name, event.handler))
    }

    static unsubscribe(status: Socket) {
        Status.Events.forEach((event: StatusEvent) => status.off(event.name))
    }

}

export default Status