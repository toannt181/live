import {REGISTER_TOKEN, REGISTER_TOKEN_FAILURE, REGISTER_TOKEN_SUCCESS} from './constants';

export function registerToken(params) {
    return {
        type : REGISTER_TOKEN,
        params
    };
}
export function registerTokenSuccess(params) {
    return {
        type : REGISTER_TOKEN_SUCCESS,
        ...params
    };
}
export function registerTokenFailure(message) {
    return {
        type : REGISTER_TOKEN_FAILURE,
        message
    };
}