import * as Types from '../constants/ActionTypes';
const cons = {
    id : null,
    assignee : null,
    created_at : null,
    topic_id : null,
    status : null,
};
export default function room(state = cons, action) {
    switch (action.type) {
    case Types.SET_ROOM_INFO:
        return action.room;
    case Types.SET_ROOM:
        return {...state,...{id : action.roomId}};
    case Types.SET_ADMIN:
        return {...state,...{assignee : action.assignee}};
    default:
        return state;
    }
}