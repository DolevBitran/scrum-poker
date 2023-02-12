import { NavigationContainerRef } from "@react-navigation/native";
import { Socket } from "socket.io-client";

export { };

declare global {

    interface SocketEvent {
        name: string;
        handler: () => unknown;
    }

    interface IGuest {
        id: string;
        name: string;
    }

    type VoteType = number

    interface IRound {
        [guestId: string]: Vote
    }

    interface IRoom {
        id: string;
        name: string;
        guests: IGuest[];
        roundsHistory: IRound[];
        options: IRoomOptions;
    }

    interface ICard {
        displayName: string;
        value: number;
    }

    type DeckType = ICard[]

    interface IRoomOptions {
        deck?: DeckType;
    }

    interface RoomState {
        navigator: NavigationContainerRef<{ Home: React.FC, Room: React.FC }> | null;
        socket: Socket | null;
        id: string | null;
        name: string | null;
        guests: IGuest[];
        roundsHistory: IRound[];
        currentRound: IRound;
        options: IRoomOptions;
        guestName: string;
        selectedCardIndex: number | null;
    }

    // ==================== PAYLOADS ====================

    interface CreateRoomProps {
        hostName: string;
        roomName: string;
    }

    interface JoinRoomProps {
        id: RoomState['id'];
        guestName: IGuest['name'];
        guestId?: IGuest['id']
    }

    interface CloseRoomProps {
    }

    interface initializeRoomProps {
        room: IRoom;
        admin_secret: string;
    }

    interface VoteProps {
        roomId: string;
        value: number;
    }

    // ==================== RESPONSES ====================

    interface CreateRoomResponse {
        id: IRoom['id'];
        hostId: string;
        admin_secret?: string;
        room: IRoom
    }

    interface JoinRoomResponse {
        id: IRoom['id'];
        hostId: IGuest['id'];
        admin_secret?: string;
        room: IRoom;
    }

    interface CloseRoomResponse {
    }

    interface VoteResponse {
        success: boolean
    }

}