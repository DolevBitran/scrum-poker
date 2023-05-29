import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveDecksToLocalStorage = (decks: IDeck[]) => {
    AsyncStorage.setItem('userDecks', JSON.stringify(decks));
}
const INITIAL_STATE: DecksManagerState = {
    cards: [],
    deckName: '',
    userDecks: [],
    selectedDeckIdx: 0,
    cardBeingCreated: null
};

export const decksManager: any = createModel<RootModel>()({
    name: 'decksManager',
    state: INITIAL_STATE,
    reducers: {
        ADD_USER_DECK: (state: DecksManagerState, payload: IDeck) => ({...state, userDecks: [...state.userDecks, payload]}),
        SET_CARDS: (state: DecksManagerState, payload: ICard []): DecksManagerState => ({ ...state, cards: payload }),
        ADD_CARD: (state: DecksManagerState, payload: ICard): DecksManagerState => ({ ...state, cards: [...state.cards, payload] }),
        SET_DECK_NAME: (state: DecksManagerState, payload: string): DecksManagerState => ({ ...state, deckName: payload }),
        SET_USER_DECKS: (state: DecksManagerState, payload: IDeck[]): DecksManagerState => ({ ...state, userDecks: payload }),
        SET_SELECTED_DECK: (state: DecksManagerState, payload: number): DecksManagerState => ({ ...state, selectedDeckIdx: payload }),
        SET_CARD_BEING_CREATED: (state: DecksManagerState, payload: ICard): DecksManagerState => ({ ...state, cardBeingCreated: payload }),

    },
    effects: (dispatch: Dispatch) => ({
        setCardBeingCreated(payload: ICard) {
            this.SET_CARD_BEING_CREATED(payload)
        },
        saveCard(payload: ICard) {
            this.ADD_CARD(payload);
        },
        setCards(payload: ICard[]) {
            this.SET_CARDS(payload);
        },
        deleteCard(payload: number, state: RootModel) {
            const cardsToSet = state.decksManager.cards.filter((_: any, idx: number) => idx !== payload )
            this.SET_CARDS(cardsToSet)
        },
        setDeckName(payload: string) {
            this.SET_DECK_NAME(payload);
        },
        deleteDeck(payload: number, state: RootModel) {
            const userDecksToSet = state.decksManager.userDecks.filter((_: any, index: number) => index !== payload);
            saveDecksToLocalStorage(userDecksToSet)
            this.SET_USER_DECKS(userDecksToSet);
        },
        onCreateDeck(payload: undefined, state: RootModel) {
            const deckToAdd = {
                cards: state.decksManager.cards,
                name: state.decksManager.deckName
            }
            this.ADD_USER_DECK(deckToAdd);
            saveDecksToLocalStorage([...state.decksManager.userDecks, deckToAdd])
        },
        onSaveDeck(payload: undefined, state: RootModel) {
            const selectedDeckIdx = state.decksManager.selectedDeckIdx
            const currentCards = state.decksManager.cards
            const userDecks = state.decksManager.userDecks
            const decksToSet = [...userDecks]
            const deckName = state.decksManager.deckName
            decksToSet[selectedDeckIdx] = {...userDecks[selectedDeckIdx],name: deckName, cards: currentCards}
            this.SET_USER_DECKS(decksToSet);
            saveDecksToLocalStorage(decksToSet)
        },
        setSelectedDeck(payload: number, state: RootModel) {
            this.SET_SELECTED_DECK(payload)
            this.SET_CARDS(state.decksManager.userDecks[payload].cards)
        },
        async loadDecksFromLocalStorage() {
            const userDecksFromStorage = await AsyncStorage.getItem('userDecks')
            if(userDecksFromStorage) {
                const parsedUserDecks: IDeck = JSON.parse(userDecksFromStorage);
                this.SET_USER_DECKS(parsedUserDecks);
            }
        }
    }),
});
