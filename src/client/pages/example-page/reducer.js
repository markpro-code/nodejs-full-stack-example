import { handleActions } from 'redux-actions'
import * as immutable from 'object-path-immutable'
import { actionTypes } from './actions.js'


function getInitState() {
    return {}
}

export default handleActions(
    {
        [actionTypes.RESET_STATE]() {
            return getInitState()
        },
    },
    getInitState(),
)
