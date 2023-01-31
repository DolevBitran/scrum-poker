import { createSelector } from 'reselect'
import { iRootState } from '..'
import User from '../../types/user.type'

export const getUser = (state: iRootState): User => state.auth.user
export const isLoggedInSelector = createSelector(
    getUser,
    (user: User) => !!user
)
