import { iRootState } from '..';

export const getDeckBeingBuilt = (state: iRootState): DecksManagerState['cards'] => state.decksManager.cards

export const getAllDecks = (state: iRootState): DecksManagerState['userDecks'] => state.decksManager.userDecks

export const getSelectedDeckIdx = (state: iRootState): DecksManagerState['selectedDeckIdx'] => state.decksManager.selectedDeckIdx

export const getCardBeingCreated = (state: iRootState): DecksManagerState['cardBeingCreated'] => state.decksManager.cardBeingCreated