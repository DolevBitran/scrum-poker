import { createSelector } from 'reselect'
import { iRootState } from '..'
import { Room } from '../models/room.model'


export const getRoom = (state: iRootState): Room => ({
    id: state.room.id,
    name: state.room.name,
    guests: state.room.guests,
    roundsHistory: state.room.roundsHistory,
    options: state.room.options
})


// chained selector example
// export const getRoute = createSelector(
//     getTrail,
//     (trialObj: MapState['trail']) => trialObj && ROUTES[trialObj.trail]
// )



