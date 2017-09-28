import * as types from './actionTypes';
import roomApi from '../api/roomApi';
import * as tabActions from './tabActions';
import * as messageActions from './messageActions';

export function loadRoomsSuccess(rooms) {
    return {type: types.LOAD_ROOMS_SUCCESS, rooms};
}

export function adminJoinRoom(room) {
    return {type: types.ADMIN_JOIN_ROOM, room};
}

export function adminReJoinRoomSuccess(room) {
    return {type: types.ADMIN_RE_JOIN_ROOM, room};

}

export function adminSendRequestJoinRoomSocket(room) {
    return {type: types.ADMIN_SEND_REQUEST_SOCKET, room};
}

export function changeStatusOfRoom(roomId, status) {
    console.log("change status of room", roomId);
    return {type: types.CHANGE_STATUS_OF_ROOM, roomId, status};
}

export function loadLocalStorage() {
    return {type: 'INIT'};
}

export function adminReJoinRoom(room) {
    return dispatch => {
        return roomApi.confirmAdminReJoinRoom(room)
            .then(res => res.data)
            .then(data => {
                if (data == true) {
                    dispatch({type: types.ADMIN_RE_JOIN_ROOM, room});
                } else {
                    //TODO: change status of room to 3 because this room was closed
                    let newRoom = Object.assign(room, {status: 3});
                    dispatch(tabActions.createTab(newRoom));
                    dispatch(messageActions.loadMessages(room.id));
                }
            })
            .catch(error => {
                throw (error);
            })
    };
}

export function adminJoinRoomSuccess(room) {
    return function (dispatch) {
        return roomApi.adminJoinRoomSuccess(room)
            .then(() => {
                dispatch(tabActions.createTab(room));
                dispatch(tabActions.changeTab(room.id));
                dispatch(messageActions.loadMessages(room.id));
                dispatch(changeStatusOfRoom(room.id, 2));
            })
            .catch(error => {
                throw (error);
            })
    }

}

/**
 * add new room to state (new tab)
 * @param room
 * @returns {{type, room: *}}
 */
export function addNewRoom(room) {
    return {type: types.ADD_NEW_ROOM, room}
}

/**
 * admin send request to join room to laravel server
 * @param room
 * @returns {Function}
 */
export function adminSendRequestJoinRoom(room) {
    return function (dispatch) {
        return roomApi.sendRequestJoinRoom(room)
            .then(res => res.data)
            .then(data => {
                if (data.result) {
                    dispatch(adminSendRequestJoinRoomSocket(room));
                }
            })
            .catch(error => {
                throw(error);
            })
    }
}

/**
 * load all rooms of admin
 * @param adminId
 * @returns {Function}
 */
export function loadAllRooms() {
    return function (dispatch) {
        return roomApi.getAllRooms()
            .then(res => res.data)
            .then(rooms => {
                dispatch(loadRoomsSuccess(rooms));
                dispatch(loadLocalStorage());
            })
            .catch(error => {
                throw (error);
            });
    };
}

/**
 * @brief load room data when load from local storage
 * @param roomId
 * @returns {Function}
 */
export function loadRoomData(roomId) {
    return function (dispatch) {
        return roomApi.loadRoomData(roomId)
            .then(res => res.data)

            .catch(error => {
                throw (error);
            });
    }
}
