import { Models } from '@rematch/core';
import { room } from './room.model';
import { app } from './app.model';

export interface RootModel extends Models<RootModel> {
    room: typeof room;
    app: typeof app;
}

export const models: RootModel = { room, app };