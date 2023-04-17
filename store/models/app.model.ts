import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { ROOM_MODE } from '../../src/constants/constants';
import { CommonActions } from '@react-navigation/native';



const INITIAL_STATE: AppState = {
    navigator: null,
    room: ROOM_MODE.TABLE
};

export const app: any = createModel<RootModel>()({
    name: 'app',
    state: INITIAL_STATE,
    reducers: {
        SET_ROOM_MODE: (state: AppState, payload: typeof ROOM_MODE): AppState => ({ ...state, room: payload }),
        SET_NAVIGATOR: (state: AppState, payload: AppState['navigator']): AppState => ({ ...state, navigator: payload }),

    },
    effects: (dispatch: Dispatch) => ({
        async setRoomMode(payload: typeof ROOM_MODE, state: RootModel) {
            this.SET_ROOM_MODE(payload)
            return state.app.room;
        },
        async navigateTo(payload: string, state: AppState) {
            state.navigator.dispatch(CommonActions.navigate({ name: payload }))
        }
    }),
});
