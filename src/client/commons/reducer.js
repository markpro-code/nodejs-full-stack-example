import { handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'

import { actionTypes } from '@/commons/constants'

function getInitState() {
    return Immutable({

    })
}

export default handleActions(
    {
        [actionTypes.RESET_STATE]() {
            return getInitState()
        },
    },

    getInitState(),
)
