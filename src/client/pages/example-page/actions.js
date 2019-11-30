import { createActionTypes } from '@/commons/utils'

export const actionTypes = createActionTypes($namespace, [
    'RESET_STATE',
    'ajax:GET_DATA',
])

export const actions = {
    dpActionResetState() {
        return {
            type: actionTypes.RESET_STATE,
        }
    },
}
