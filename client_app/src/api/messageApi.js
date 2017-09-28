import axios from 'axios';
import * as config from '../config/config';

class MessageApi {
    static getMessages(roomId) {
        return axios.get(`${config.GET_MESSAGE_FROM_ROOM_ID}?roomid=${roomId}`);
    }

    static uploadFile(data) {
        return axios.post(`${config.UPLOAD_FILE}`, data);
    }

    static getMetaLink(message) {
        return axios.get(`${config.GET_META_LINK}?url=${message.message.content}`);
    }
}

export default MessageApi;
