import { NavigationContainerRef } from "@react-navigation/native";
import { Socket } from "socket.io-client";

export { };

declare global {


    // ==================== ENUMS ====================


    // enum ROOM_MODE {
    //     TABLE = 0,
    //     SUMMARY = 1
    // }

    // ==================== TYPES ====================


    type AppNavigationContainer = NavigationContainerRef<{
        Home: React.FC;
        Room: React.FC;
        DeckBuilder: React.FC;
    }>

    interface SocketEvent {
        name: string;
        handler: () => unknown;
    }

    interface IGuest {
        id: string;
        name: string;
        isConnected: boolean;
    }

    type VoteType = number

    type Vote = number | null

    interface IRound {
        [guestId: string]: Vote
    }

    interface IRoom {
        id: string;
        name: string;
        guests: IGuest[];
        roundsHistory: IRound[];
        currentRound: IRound;
        options: IRoomOptions;
    }

    interface ICard {
        displayName: string;
        value: number;
    }

    type DeckType = ICard[]

    interface IRoomOptions {
        deck?: IDeck
    }

    type ISummaryData = { [id: IGuest['id']]: Vote[] }

    interface IDeck {
        name: string,
        cards: ICard[]
    }
    interface AppState {
        navigator: Navigation | null
        room: ROOM_MODE
    }

    interface RoomState {
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

    interface DecksManagerState {
        cards: Icard [];
        deckName: string;
        userDecks: IDeck[];
        selectedDeckIdx: number | null,
        cardBeingCreated: Icard | null
    }
    // ==================== PAYLOADS ====================

    interface CreateRoomProps {
        hostName: string;
        roomName: string;
        deck: IDeck;
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
        admin_secret?: string;
        guestId: IGuest['id'];
    }

    interface VoteProps {
        roomId: string;
        value: number;
    }

    interface NextRoundProps {
        roomId: string;
        // value: number;
    }

    // ==================== RESPONSES ====================

    interface CreateRoomResponse {
        id: IRoom['id'];
        hostId: string;
        admin_secret?: string;
        room: IRoom;
    }

    interface JoinRoomResponse {
        id: IRoom['id'];
        hostId: IGuest['id'];
        guestId: IGuest['id'];
        admin_secret?: string;
        room: IRoom;
    }

    interface CloseRoomResponse {
    }

    interface VoteResponse {
        success: boolean
    }

    interface NextRoundResponse {
        success: boolean
    }

}