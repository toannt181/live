import * as Types from '../constants/ActionTypes';
const cons = {
    url : null,
    time: null
};
export default function image(state = cons, action) {
    switch (action.type) {
    case Types.SET_IMAGE:
        return {...state,...action.image};
    default:
        return state;
    }
}