import { createModel, RematchDispatch } from '@rematch/core';
import { POST } from '../../service/api';
import User from '../../types/user.type';
import { RootModel } from './index';

export type AuthState = {
    user: User | null;
    token: string | null;
}

const INITIAL_STATE: AuthState = {
    user: null,
    token: null,
}

type LoginFormProps = {
    email: string;
    password: string;
}

type RegisterFormProps = {
    email: string;
    password: string;
}

export const auth: any = createModel<RootModel>()({
    name: 'auth',
    state: INITIAL_STATE, // initial state
    reducers: {
        // handle state changes with pure functions
        SET_USER: (state: AuthState, payload: User | null): AuthState => ({ ...state, user: payload }),
        SET_TOKEN: (state: AuthState, payload: AuthState['token']): AuthState => ({ ...state, token: payload }),
    },
    effects: (dispatch: RematchDispatch<RootModel>) => ({
        async registerUser(payload: RegisterFormProps, state: RootModel) {
            // const authData = await post('register', payload)


            return state.auth.user
        },
        async loginUser(payload: LoginFormProps, state: RootModel) {
            try {
                const authData = await POST('login', payload)
                console.log({ ...authData })
                this.SET_TOKEN(authData.secret)
                localStorage.setItem('token', authData.secret);
                const user = await POST('retrive', { session: authData.secret })
                console.log('Success ! login: ')
                console.log({ ...user })
                this.SET_USER(user)
            } catch (err) {
                console.error(err)
                throw err

            }
            return state.auth.user
        },
    }),
});