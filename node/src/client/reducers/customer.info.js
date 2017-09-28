import * as Types from '../constants/ActionTypes';
const cons = {
    name : null,
    phone : null,
    email : null,
    customerId : null,
};

export default function formChat(state = cons, action) {
    switch (action.type) {
        case Types.SET_CUSTOMER_INFO:
            return {...state,...action.info};
        case Types.SET_CUSTOMER_ID:
            return {...state,...{customerId : action.customerId}};
        default:
            return state;
    }
}