import * as Types from '../constants/ActionTypes';
const cons = [];
export default function inputRegister(state = cons, action) {
    switch (action.type) {
        case Types.SET_INPUT_REGISTER:
        return [...state,...action.registers];
    default:
        return state;
    }
}