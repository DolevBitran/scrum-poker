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
export const getOnlineGuests = (state: iRootState): IGuest[] => state.room.guests.filter((guest: IGuest) => guest.isConnected);
export const getCurrentRound = (state: iRootState): RoomState['currentRound'] => state.room.currentRound;
export const getUnvotedGuestCount = (state: iRootState) => {
	return state.room.guests.filter((guest: IGuest) => !Object.keys(state.room.currentRound).includes(guest.id)).length
};
export const getDeck = (state: iRootState): RoomState['options']['deck'] => state.room.options.deck;
export const getSelectedCardIndex = (state: iRootState): RoomState['selectedCardIndex'] => state.room.selectedCardIndex;

export const getSummaryTableData = (state: iRootState): ISummaryData => {
	const rounds = [...state.room.roundsHistory, state.room.currentRound]
	const dataTable: ISummaryData = {};
	state.room.guests.forEach((guest: IGuest) => dataTable[guest.id] = new Array(rounds.length).fill(null));
	rounds.map((round: IRound, index) => {
		console.log(round)
		const votes = Object.entries(round)
		votes.forEach(([guestId, voteValue]: [IGuest['id'], Vote]) => dataTable[guestId][index] = voteValue)
	})
	return dataTable
}

// chained selector example
// export const getRoute = createSelector(
//     getTrail,
//     (trialObj: MapState['trail']) => trialObj && ROUTES[trialObj.trail]
// )
