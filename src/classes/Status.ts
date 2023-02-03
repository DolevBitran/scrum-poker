import io, { Socket } from 'socket.io-client';
import { store } from '../../store';
import { CreateRoomResponse, JoinRoomProps, JoinRoomResponse, Room } from '../../store/models/room.model';

interface CreateRoomProps {

}

const uri = 'http://localhost:8001'

class Status {
    static status: Socket;

    constructor(status: Socket) {
        Status.status = status
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


    static subscribe(status: Socket) {
        status.on('guest_joined', store.dispatch.room.onGuestJoined)
        status.on('guest_left', store.dispatch.room.onGuestLeave)
        // status.on('room:vote', dispatch.room.onVoteUpdate)
        // status.on('room:next', dispatch.room.onNextRound)
        // status.on('room:options', dispatch.room.optionsChanged)
        // status.on('room:close', dispatch.room.roomDismissed)
    }



}

export default Status