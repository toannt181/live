import {getAgentSocket} from '../helper';
import moment from 'moment';
import _ from 'lodash';
import client from '../config/redis.config';
import pushNotification from '../push-notification/pushNotificationApi';
import Room from '../models/Room';
import {getTopicName} from './message';
import Message from '../models/Message';

import {findTopicId} from './message';
/**
 *
 * @param redisValue {room,customer}
 * @param messageText
 * @param io
 * @param messageType
 */
export function clientFbSendMessage(io, redisValue, {messageText, messageType}) {
    let roomId = redisValue.room.id;
    let senderId = redisValue.customer.id;
    let name = redisValue.customer.name;
    let message = messageText;
    let type;
    switch (messageType) {
    case 'image':
        type = 103;
        break;
    case 'file':
        type = 104;
        break;
    default:
        type = 100;
    }

    return Message
        .create({room_id: roomId, sender_id: senderId, content: message, message_type: type})
        .then(newMessage => {
            io.of('/chat').to(roomId).emit('server-send-message', {
                name, message, type, senderId,
                messageId: newMessage.id,
                createdAt: newMessage.created_at,
                roomId: roomId
            });
        })
        .catch(err => console.log(err.message));

}

export async function notifyAgentReChat(io, agentSocketId, finalRoomRedis, {senderId, messageText}) {
    let data = {
        roomId: finalRoomRedis.room.id,
        topicId: finalRoomRedis.room.topicId,
        topic: getTopicName(finalRoomRedis.room.topicId),
        roomType: 'facebook',
        customerId: finalRoomRedis.customer.fb_id,
        createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
        room_id: finalRoomRedis.room.id,
        customer_name: finalRoomRedis.customer.name,
        customerName: finalRoomRedis.customer.name,
        created_at: moment().format('YYYY-MM-DD hh:mm:ss')
    };
    emitToAgent(io,agentSocketId,data);

    // push notidication to admin
    await pushNotification({
        adminId: finalRoomRedis.agentId,
        title: 'New room has been auto assigned',
        body: `Customer Name: ${finalRoomRedis.customer.name}, type: ${getTopicName(finalRoomRedis.room.topicId)}`
    });

    console.log(`notifyAgentReChat: ${messageText}`);
    await clientFbSendMessage(io,finalRoomRedis,{messageText});

}

export async function notifyAdminNewRoom(io, roomRedis, {senderId, messageText}) {

    // create room that have status = 1
    let topicId = findTopicId(messageText) || 1;
    let status = 1;
    let room = await createRoom(status,topicId);

    //get AdminId from digit;
    let agent = await getAgentSocket(io);

    let data = {
        roomId: room.id,
        topicId: room.topic_id,
        topic: getTopicName(room.topic_id),
        customerName: roomRedis.customer.name,
        roomType: 'facebook',
        customerId: roomRedis.customer.fb_id,
        createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
        room_id: room.id,
        customer_name: roomRedis.customer.name,
        created_at: moment().format('YYYY-MM-DD hh:mm:ss')
    };
    _(agent.socketIds).each(socket => {
        emitToAgent(io,socket,data);
    });


    // save update RoomRedis
    let finalRedisRoom = await updateRoomRedis(senderId, room, roomRedis,agent.id);

    //update room status have assignee
    await Room.update({
        status: 2,
        assignee: agent.id
    },
        {where: {id: room.id}}
    );

    // push notidication to admin
    await pushNotification({
        adminId: agent.id,
        title: 'New room has been auto assigned',
        body: `Customer Name: ${roomRedis.customer.name}, type: ${getTopicName(finalRedisRoom.room.topicId)}`
    });

    await clientFbSendMessage(io,finalRedisRoom,{messageText});

}

export async function notifyAssignRoomForNewAgent(io, roomRedis, {senderId, messageText}) {
    //get AdminId from digit;
    let agent = await getAgentSocket(io);
    //check ko co agent nao online
    if( !agent ) {
        return await clientFbSendMessage(io,roomRedis,{messageText});
    }

    let data = {
        roomId: roomRedis.room.id,
        topicId: roomRedis.room.topicId,
        topic: getTopicName(roomRedis.room.topicId),
        customerName: roomRedis.customer.name,
        roomType: 'facebook',
        customerId: roomRedis.customer.fb_id,
        createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
        room_id: roomRedis.room.id,
        customer_name: roomRedis.customer.name,
        created_at: moment().format('YYYY-MM-DD hh:mm:ss')
    };

    _(agent.socketIds).each(socket => {
        emitToAgent(io,socket,data);
    });

    //update room status have assignee
    await Room.update({
        assignee: agent.id
    },
        {where: {id: roomRedis.room.id}}
    );

    // save update RoomRedis
    let finalRedisRoom = await updateRoomRedis(senderId, roomRedis.room ,roomRedis,agent.id);

    // push notidication to admin
    await pushNotification({
        adminId: agent.id,
        title: 'New room has been auto assigned',
        body: `Customer Name: ${roomRedis.customer.name}, type: ${getTopicName(finalRedisRoom.room.topicId)}`
    });

    await clientFbSendMessage(io,finalRedisRoom,{messageText});

}

async function updateRoomRedis(senderId, room, roomRedis,agentId) {
    let finalRoomRedis = {
        status: 1,
        room: {
            id: room.id,
            topicId: room.topic_id || room.topicId,
            status: 2
        },
        agentId,
        customer : roomRedis.customer,
        firstMessage : roomRedis.firstMessage
    };

    await client.set(senderId,JSON.stringify(finalRoomRedis));
    return finalRoomRedis;
}

/**
 * emit to agent client that have new room
 * @param id
 * @param data
 */
function emitToAgent(io, id, data) {
    let adminSocketObject = io.nsps['/chat'].connected[id];
    if (!adminSocketObject) throw new Error('no have admin online');
    adminSocketObject.join(data.roomId);
    adminSocketObject
        .emit('server-send-auto-assigned-room', data);
}

async function createRoom(status,topicId = 3) {
    return Room.create({
        topic_id: topicId,
        status,
        room_type: 'facebook'
    }).then((res) => res.dataValues);
}
