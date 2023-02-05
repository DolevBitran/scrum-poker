import { createSelector } from 'reselect';
import { iRootState } from '..';
import { Room, RoomState } from '../models/room.model';

export const getRoom = (state: iRootState): Room => ({
	id: state.room.id,
	name: state.room.name,
	guests: state.room.guests,
	roundsHistory: state.room.roundsHistory,
	options: state.room.options,
});

export const getGuestName = (state: iRootState): RoomState['guestName'] => state.room.guestName;
export const getDeck = (state: iRootState): RoomState['options']['deck'] => state.room.options.deck;

export const getSelectedCardIndex = (state: iRootState): RoomState['selectedCardIndex'] => state.room.selectedCardIndex;
// chained selector example
// export const getRoute = createSelector(
//     getTrail,
//     (trialObj: MapState['trail']) => trialObj && ROUTES[trialObj.trail]
// )
