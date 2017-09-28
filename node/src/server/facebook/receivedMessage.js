/**
 * send back to fb that my app have some topic : technical, sale, ...
 * @param senderId
 * @param messageText
 * @returns {Promise.<*>}
 */
import client from '../config/redis.config';
import Customer from '../models/Customer';
import {callGetUserInfo, callSendAPI} from './callApi';
import {
    notifyAdminNewRoom, clientFbSendMessage, notifyAgentReChat,notifyAssignRoomForNewAgent
} from './sendMessageSocket';
import {getMessageTypeTopic} from './message';
import {getSocketIdByAgentId} from '../helper';

async function sendTopicToFb(senderId, messageText) {
    let user = createUser(senderId, messageText);
    let sendTopic = callSendAPI(senderId, getMessageTypeTopic());

    return await Promise.all([user, sendTopic]);
}

async function chatWithMessageText(event, io) {
    const senderId = event.sender.id;
    const recipientID = event.recipient.id;
    const timeOfMessage = event.timestamp;
    const message = event.message;
    const messageId = message.mid;
    const messageText = message.text;

    const roomInfo = await findRoom(senderId);

    // firstTime chat with agent
    if (!roomInfo) {
        return await sendTopicToFb(senderId, messageText);
    }

    //secondTime chat with agent no send topic
    const roomRedis = JSON.parse(roomInfo);

    //ìf status === 1 đã chat truoc do
    if (roomRedis.status === 1) {
        //todo: check room in redis is online
        const room = io.nsps['/chat'].adapter.rooms[roomRedis.room.id];
        if(!room){
            // find agent chat before
            const agentId = roomRedis.agentId;
            // findSocket have id = agentId online
            let agentSocketIds = getSocketIdByAgentId(agentId,io);

            if(agentSocketIds || agentSocketIds.length() === 0 ) {
                //notify for agent
                let parallel = agentSocketIds.map(socketId => {
                    return notifyAgentReChat(io,socketId,roomRedis,{messageText})
                });
                await Promise.all(parallel);
            }

            // agent no online then notify for other agent
            return await notifyAssignRoomForNewAgent(io,roomRedis,{senderId,messageText});
        }
        // room online
        return await clientFbSendMessage(io,roomRedis,{messageText});
    }

    // after send topic to facebook mean status === 0
    try {
        // new room
        await notifyAdminNewRoom(io, roomRedis, {senderId, messageText});

    } catch (e) {
        console.error(e);
    }


}

async function chatWithMessageAttachments(event, io) {
    const senderId = event.sender.id;
    const message = event.message;
    const messageAttachments = message.attachments;
    const redisValue = await findRoom(senderId);

    return await clientFbSendMessage(
        io,
        JSON.parse(redisValue),
        {
            messageText: messageAttachments[0].payload.url,
            messageType: messageAttachments[0].type
        }
    );
}

async function findRoom(senderID) {
    return await client.getAsync(senderID);
}

/**
 * save mysql and redis {fb_id : {status,customer}}
 * @param senderID
 * @param firstMessage
 */
function createUser(senderID, firstMessage) {
    return callGetUserInfo(senderID)
        .then(res => Customer.create({
            name: res,
            phone: '113',
            email: 'facebook@fb.com',
            fb_id: senderID
        }))
        .then(res => {
            // just create a key for searching
            client.set(senderID, JSON.stringify({
                status: 0,
                customer: res.dataValues,
                firstMessage: firstMessage
            }));
        })
        .catch(e => console.error(e));
}
/**
 * Handle when receive massage
 * @param event
 * @param io
 * @returns {Promise.<void>}
 */
export async function receivedMessage(event, io) {
    try{
        const message = event.message;
        const messageText = message.text;
        const messageAttachments = message.attachments;

        if (messageText) await chatWithMessageText(event, io);
        else if (messageAttachments) await chatWithMessageAttachments(event, io);
    }
    catch(err) {
        console.log(err);
    }
}
