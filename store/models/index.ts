import { Models } from '@rematch/core';
import { room } from './room.model';
import { app } from './app.model';
import { decksManager } from './decksManager.model';
export interface RootModel extends Models<RootModel> {
    room: typeof room;
    app: typeof app;
    decksManager: typeof decksManager

}

export const models: RootModel = { room, app, decksManager };
