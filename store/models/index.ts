import { Models } from '@rematch/core';
// import { auth } from './auth.model';
// import { map } from './map.model';
import { room } from './room.model';

export interface RootModel extends Models<RootModel> {
    // auth: typeof auth;
    // map: typeof map;
    room: typeof room;
}

export const models: RootModel = { room };