import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { ROOM_MODE } from '../../src/constants/constants';



const INITIAL_STATE: AppState = {
    room: ROOM_MODE.TABLE
};

export const app: any = createModel<RootModel>()({
    name: 'app',
    state: INITIAL_STATE,
    reducers: {
        SET_ROOM_MODE: (state: AppState, payload: typeof ROOM_MODE): AppState => ({ ...state, room: payload }),
    },
    effects: (dispatch: Dispatch) => ({
        async setRoomMode(payload: typeof ROOM_MODE, state: RootModel) {
            this.SET_ROOM_MODE(payload)
            return state.app.room;
        },
    }),
});