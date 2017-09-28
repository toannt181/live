import _ from 'lodash';
import * as roomActions from '../actions/roomActions';

var localStorageTabs = null;
export default store => next => action => {
    const {type} = action;
    if(type === "LOAD_LOCAL_STORAGE") {
        localStorageTabs = JSON.parse(
            localStorage.getItem('CHAT_BOX')
        ).tabs;
    }
    if (type === 'INIT') {

        try {

            if (localStorageTabs.length > 0) {
                let currentRooms = store.getState().rooms;
                    _.forEach(localStorageTabs, function (room) {
                        let index = _.findIndex(store.getState().rooms, ['id', room.id]);
                        if ( index != -1) {
                            store.dispatch(roomActions.adminReJoinRoom(currentRooms[index]));
                        }
                        else {
                            store.dispatch(roomActions.loadRoomData(room.id));
                        }
                    });
                }

            return;
        } catch (e) {
            // Unable to load or parse stored state, process as usual
        }
    }

    next(action);
};
