import io from 'socket.io-client';
import {SOCKET_URL} from "../constants/Server";

const socket = io(SOCKET_URL);
export default function (state = socket) {
    return state;
}