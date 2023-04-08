import { Models } from '@rematch/core';
import { room } from './room.model';

export interface RootModel extends Models<RootModel> {
    room: typeof room;
}

export const models: RootModel = { room };