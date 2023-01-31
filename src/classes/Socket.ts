import io, { Socket } from 'socket.io-client';

interface CreateRoomProps {

}


class SocketService {
    socket: Socket;
    constructor(status: Socket) {
        this.socket = status
    }


    static createRoom(uri: string, payload: CreateRoomProps) {
        const status = io(uri)
        status.on('connection', () => {
            status.emit('room:create', payload)

            status.on('room:created', dispatch.room.onCreated)
            status.on('room:participates', dispatch.room.onParticipatesUpdate)
            status.on('room:vote', dispatch.room.onVoteUpdate)
            status.on('room:next', dispatch.room.nextRound)
            status.on('room:options', dispatch.room.optionsChanged)
            status.on('room:close', dispatch.room.roomDismissed)
        })

        return new SocketService(status)
    }

}