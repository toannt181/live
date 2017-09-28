import * as Types from '../constants/ActionTypes';
const cons = {
    ratingValue : null,
    feedBack : null
};
export default function rating(state = cons, action) {
    switch (action.type) {
        case Types.SEND_RATING:
            return {...state,...action.rating};
        default:
            return state;
    }
}