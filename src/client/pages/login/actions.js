import { createActionTypes } from '@/commons/utils'

export const actionTypes = createActionTypes($namespace, [
    'REGISTER',
    'LOGIN',
])

export const actions = {
    dpActionRegister(username, password, passwordRepeat) {
        return {
            type: actionTypes.REGISTER,
            payload: { username, password, passwordRepeat },
        }
    },

    dpActionLogin: (username, password) => ({
        type: actionTypes.LOGIN,
        payload: { username, password },
    }),
}
