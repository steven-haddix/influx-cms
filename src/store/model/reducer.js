import { initialState } from './selectors'
import { POST_LIST_SUCCESS } from './actions'

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_LIST_SUCCESS:
            return {
                ...state,
                list: action.list
            }
        default:
            return state
    }
}