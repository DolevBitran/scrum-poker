import { NavigationContainerRef } from "@react-navigation/native";
import { Socket } from "socket.io-client";

export { };

declare global {

    type StatusEvent = {
        name: string;
        handler: () => unknown;
    }

    type Guest = {
        id: string;
        name: string;
    }

    type Vote = number

    type Round = {
        [guestId: string]: Vote
    }

    type RoomOptions = {
    }

    type Room = {
        id: string;
        name: string;
        guests: Guest[];
        roundsHistory: Round[],
        options: RoomOptions;
    }

    type RoomState = {
        navigator: NavigationContainerRef<{ Home: unknown; Table: unknown; }> | null;
        socket: Socket | null;
        id: string | null;
        name: string | null;
        guests: Guest[];
        roundsHistory: Round[];
        options: RoomOptions;
        guestName: string;
        selectedCardIndex: number | null;
    }

    // ==================== PAYLOADS ====================

    type CreateRoomProps = {
        hostName: string;
        roomName: string;
    }

    type JoinRoomProps = {
        id: RoomState['id'];
        guestName: Guest['name'];
        guestId?: Guest['id']
    }

    type CloseRoomProps = {
    }

    type initializeRoomProps = {
        room: Room;
        admin_secret: string;
    }

    type VoteProps = {
        roomId: string;
        value: number;
    }

    // ==================== RESPONSES ====================

    type CreateRoomResponse = {
        id: Room['id'];
        hostId: string;
        admin_secret?: string;
        room: Room
    }

    type JoinRoomResponse = {
        id: Room['id'];
        hostId: Guest['id'];
        admin_secret?: string;
        room: Room;
    }

    type CloseRoomResponse = {
    }

    type VoteResponse = {
        success: boolean
    }

}