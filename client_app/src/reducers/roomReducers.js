import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roomReducer(state = initialState.rooms, action) {
    switch (action.type) {

        //TODO: load rooms from server
        case types.LOAD_ROOMS_SUCCESS:
            return [
                ...state,
                ...action.rooms
            ];

        //TODO: when server confirm admin join room successfully
        case types.CHANGE_STATUS_OF_ROOM:
            return state.map(room => {
                if (room.id !== action.roomId) {
                    // This isn't the item we care about - keep it as-is
                    return room;
                }

                return Object.assign(
                    {},
                    room,
                    {status: action.status}
                );
            });

        //TODO: when has new room
        case types.ADD_NEW_ROOM:
            return [
                action.room,
                ...state
            ];

        //TODO: default case
        default:
            return state;

    }
}
