import { createSelector } from 'reselect';
import { iRootState } from '..';


export const getRoomMode = (state: iRootState) => state.app.room;