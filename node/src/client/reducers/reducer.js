import {combineReducers} from 'redux';

import customer from './customer.info';
import messages from './messages';
import toggleForm from './toggleform';
import topic from './topic';
import room from './room';
import rating from './rating';
import socket from './socket';
import image from './image';
import inputRegisters from './inputRegister';

let reducer = combineReducers({
    customer,
    messages,
    toggleForm,
    topic,
    room,
    socket,
    rating,
    image,
    inputRegisters
});

export default reducer;