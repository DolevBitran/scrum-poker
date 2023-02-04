import io, { Socket } from 'socket.io-client';
import { store } from '../../store';
import { CreateRoomResponse, JoinRoomProps, JoinRoomResponse, Room } from '../../store/models/room.model';

interface CreateRoomProps {}

const uri = 'http://localhost:8001';

class SocketManager {
	socket: Socket;

	constructor() {
		this.socket = io(uri);
	}
	async createRoom(payload: CreateRoomProps) {
		return new Promise<CreateRoomResponse>((resolve, reject) => {
			this.socket.on('connect', () => {
				console.log('connection successful');

				const callback = (response: CreateRoomResponse) => {
					console.log('room_created', response);
					this.subscribe();
					resolve(response);
				};

				this.socket.emit('create_room', payload, callback);
			});
		});
	}

	async joinRoom(payload: JoinRoomProps) {
		return new Promise<JoinRoomResponse>((resolve, reject) => {
			console.log('joining room');
			this.socket.on('connect', () => {
				console.log('connection successful');

				const callback = (response: JoinRoomResponse) => {
					console.log('room_joined', response);
					this.subscribe();
					resolve(response);
				};

				this.socket.emit('join_room', payload, callback);
			});
		});
	}

	async vote(payload: number) {
		console.log('socket manager class');
		this.socket.emit('vote', payload);
	}

	subscribe() {
		this.socket.on('guest_joined', store.dispatch.room.onGuestJoined);
		this.socket.on('guest_left', store.dispatch.room.onGuestLeave);
		// status.on('room:vote', dispatch.room.onVoteUpdate)
		// status.on('room:next', dispatch.room.onNextRound)
		// status.on('room:options', dispatch.room.optionsChanged)
		// status.on('room:close', dispatch.room.roomDismissed)
	}
}

export default SocketManager;
