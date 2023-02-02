import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';
import { Middleware } from 'redux'
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';

// const allowedActionWithoutRoom = [
//    'room/join',
//    'room/create',
//    'room/test'
// ]

// const customMiddleware: Middleware<{}, RootModel> = store => next => action => {
//    if (!allowedActionWithoutRoom.includes(action.type) && !store.getState().room.id) {
//       console.log('Room is need to be created first.', store.getState())
//    }
//    return next(action)
// }

type FullModel = ExtraModelsFromLoading<RootModel, { type: 'full' }>

export const store = init<RootModel, FullModel>({
   models,
   plugins: [loadingPlugin({ type: 'full' })],
   // redux: {
   //    middlewares: [customMiddleware]
   // }
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type iRootState = RematchRootState<RootModel, FullModel>;
