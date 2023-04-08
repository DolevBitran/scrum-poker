import { createSelector } from 'reselect';
import { iRootState } from '..';

export const getRoom = (state: iRootState): IRoom => ({
	id: state.room.id,
	name: state.room.name,
	guests: state.room.guests,
	roundsHistory: state.room.roundsHistory,
	options: state.room.options,
});

export const getGuestName = (state: iRootState): RoomState['guestName'] => state.room.guestName;
export const getCurrentRound = (state: iRootState): RoomState['currentRound'] => state.room.currentRound;
export const getUnvotedGuestCount = (state: iRootState) => {
	return state.room.guests.filter((guest: IGuest) => !Object.keys(state.room.currentRound).includes(guest.id)).length
};
export const getDeck = (state: iRootState): RoomState['options']['deck'] => state.room.options.deck;

export const getSelectedCardIndex = (state: iRootState): RoomState['selectedCardIndex'] => state.room.selectedCardIndex;
// chained selector example
// export const getRoute = createSelector(
//     getTrail,
//     (trialObj: MapState['trail']) => trialObj && ROUTES[trialObj.trail]
// )
