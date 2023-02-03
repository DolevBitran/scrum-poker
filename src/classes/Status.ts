import io, { Socket } from 'socket.io-client';
import { store } from '../../store';
import { CreateRoomResponse, JoinRoomProps, JoinRoomResponse, Room } from '../../store/models/room.model';

interface CreateRoomProps {

}

const uri = 'http://localhost:8001'

class Status {
    socket: Socket;
    constructor(status: Socket) {
        this.socket = status
    }


    static async createRoom(payload: CreateRoomProps) {
        return new Promise<CreateRoomResponse>((resolve, reject) => {
            const status = io(uri)

            status.on('connect', () => {
                console.log('connection successful')

                const callback = (response: CreateRoomResponse) => {
                    console.log('room_created', response)
                    this.subscribe(status)
                    resolve(response)
                }

                status.emit('create_room', payload, callback)
            })
        })
    }


    static async joinRoom(payload: JoinRoomProps) {
        return new Promise<JoinRoomResponse>((resolve, reject) => {
            const status = io(uri)

            status.on('connect', () => {
                console.log('connection successful')

                const callback = (response: JoinRoomResponse) => {
                    console.log('room_joined', response)
                    this.subscribe(status)
                    resolve(response)
                }

                status.emit('join_room', payload, callback)
            })
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