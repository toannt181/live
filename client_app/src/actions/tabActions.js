import * as types from './actionTypes';
import roomApi from '../api/roomApi';
import * as roomActions from './roomActions';

export function createTab(room) {
    return {type: types.CREATE_TAB, room};
}

export function deleteTab (tab) {
    return {type: types.DELETE_TAB, tab};
}

export function changeTab(tabId) {
    return {type: types.CHANGE_TAB, tabId};
}

export function changeStatusOfTabToClosed(tabId) {
    return {type: types.CHANGE_STATUS_OF_TAB_TO_CLOSED, tabId};
}

export function changeStatusOfTab(tabId, status) {
    return {type: types.CHANGE_STATUS_OF_TAB, tabId, status}
}

export function adminSetTagOfRoom(roomId, status) {
    console.log("status line 26 tabActions.js", typeof status);
    return dispatch => {
        return roomApi.adminSetTagOfRoom(roomId, status)
            .then(res => res.data)
            .then(data => {
                if(data["result"] == true) {
                    dispatch(changeStatusOfTab(roomId, status));
                    dispatch(roomActions.changeStatusOfRoom(roomId, status));
                    dispatch(changeStatusOfTabToClosed(roomId));
                }
            })
    }
}

