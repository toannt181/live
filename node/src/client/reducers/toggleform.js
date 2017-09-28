import * as Types from '../constants/ActionTypes';


export default function toggleForm(state = false, action) {
    switch (action.type) {
    case Types.HIDE_FORM:
        return action.hideForm;
    default :
        return state;
    }
}