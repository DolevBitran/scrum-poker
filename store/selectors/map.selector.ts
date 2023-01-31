import { createSelector } from 'reselect'
import { iRootState } from '..'
import User from '../../types/user.type'
import { MapState } from '../models/map.model'

import GolanRoute from '../../../assets/mocks/routes/GolanRoute.json';
import ILTKishon from '../../../assets/mocks/routes/ILT-Kishon.json';
import ShvilNahash from '../../../assets/mocks/routes/ShvilNahash.json';
import MountEitanCircuit from '../../../assets/mocks/routes/MountEitanCircuit.json';
import SingleHertzel from '../../../assets/mocks/routes/SingleHertzel.json';

const ROUTES = {
    GolanRoute,
    ILTKishon,
    SingleHertzel,
    ShvilNahash,
    MountEitanCircuit
}

export const getUserAddress = (state: iRootState): MapState['address'] => state.map.address
export const getUserLocation = (state: iRootState): MapState['location'] => state.map.location
export const getTrail = (state: iRootState): MapState['trail'] => state.map.trail
export const getUserRoute = (state: iRootState): MapState['user_trail'] => state.map.user_trail
export const isDrawing = (state: iRootState): MapState['trail'] => state.map.draw
export const getRoute = createSelector(
    getTrail,
    (trialObj: MapState['trail']) => trialObj && ROUTES[trialObj.trail]
)



