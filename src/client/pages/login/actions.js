import { createActionTypes } from '@/commons/utils'
import { userLogin } from '@/commons/services'

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
        payload: userLogin(username, password),
    }),
}
