import axios from 'axios';
import * as config from '../config/config';

// export function* getAllRooms () {
//     try{
//         return yield axios.get(config.GET_ALL_ROOMS);
//     }catch (err){
//         return null;
//     }
//
// }

class RoomApi {
    static getAllRooms() {
        return axios.get(config.GET_ALL_ROOMS);
    }

    static sendRequestJoinRoom(room) {
        return axios.get(`${config.SEND_REQUEST_JOIN_ROOM}?roomid=${room.id}`);
    }

    static adminJoinRoomSuccess(room) {
        return axios.get(`${config.ADMIN_JOIN_ROOM_SUCCESS}?roomid=${room.id}`);
    }

    static loadRoomData(roomId) {
        return axios.get(`${config.LOAD_ROOM_DATA}?roomid=${roomId}`);
    }

    static confirmAdminReJoinRoom(room) {
        return axios.get(`${config.CONFIRM_ADMIN_RE_JOIN_ROOM}?roomid=${room.id}`);
    }

    static adminSetTagOfRoom(roomId, status) {
        return axios.post(config.ADMNIN_SET_TAG_OF_ROOM, {
            roomId,
            status
        })
    }
}

export default RoomApi;
