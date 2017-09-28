import Admin from './models/Admin';
import _ from 'lodash';
const {Room, Message} = require('./models/index');
import moment from 'moment';
import pushNotification from './push-notification/pushNotificationApi';
import {getAgentSocket} from './helper';
import * as RoomTypes from './constants/RoomTypes';
import {sendTextMessage} from './facebook/sendMessageFanpage';

let count = 0;
module.exports = (io) => {
    function getNumberOfAdmin() {
        //io.nsps['/chat'].adapter.rooms['admin'] ? io.nsps['/chat'].adapter.rooms['admin'].length - numberOfSame : 1
        let res = 1;
        if (io.nsps['/chat'].adapter.rooms['admin']) {
            let admins = io.nsps['/chat'].adapter.rooms['admin'].sockets;
            // console.log('list of admins, before join');
            let set = new Set();
            Object.keys(admins).forEach(function(key){
                let id =  io.of('/chat').connected[key].user.id;
                set.add(id);
            });

            res = set.size;
        }
        return res;
    }

    // const socketEmitter = require('socket.io-emitter')({host : process.env.REDIS_HOST ,port : process.env.REDIS_PORT});
    io.of('/chat').on('connection', (socket) => {

        console.log(`socketId: ${socket.id}`);

        socket.on('test', (e) => {
            console.log('test', e);
        });

        //admin join default room
        socket.on('admin-join-default-room', async ({adminId}, ack) => {
            //phân quyền admin cho socket
            const admin = await Admin.findOne({where: {id: adminId}});

            socket.user = admin;
            socket.role = 'admin';

            //join room
            socket.join('admin');
            // if (io.nsps['/chat'].adapter.rooms['admin']) {
            //     let admins = io.nsps['/chat'].adapter.rooms['admin'].sockets;
            //     console.log('list of admins, after join');
            //     Object.keys(admins).forEach(function(key){
            //         console.log(key);
            //     });
            // }

            //todo : admin get count
            io.of('/chat').emit('admin-count-admin-online', getNumberOfAdmin());

            // //emit join okie
            // socket.emit('server-send-join-default-room',{success : true});
            return ack(true);
        });

        /**
         * socket-admin join room when complete constructor room
         */
        socket.on('admin-join-room', (room, ack) => {
            try {
                if (!room) throw new Error('Invalid Input!');

                // join room
                socket.join(room.id);

                // emit broadcast to room admin joined
                // socket.broadcast.to(room.id).emit('server-send-admin-joined',{name : socket.user.name});

                //ack callback
                return ack(true);

            } catch (err) {
                return ack(false);
            }
        });

        /**
         * socket customer
         *     init table customer,
         *     insert first question into table messages
         *     insert room
         *     announce admin : have a new room
         */
        socket.on('client-send-join-room', async ({customer, room, topic}) => {
            try {
                //phân quyền customer cho socket
                socket.user = customer;
                socket.role = 'customer';
                // set room for socket
                socket.room = room.id;
                //join room has name roomId
                socket.join(room.id);

                //emit to customer confirm
                socket.emit('server-send-join-room', {
                    success: true
                });

                console.log(room);

                if(room.status === 2) return;
                if(room.status === 3) throw new Error('room status fail');

                //get agentId;
                let agent = await getAgentSocket(io);

                //agent open many tap
                _(agent.socketIds).each(sk => {
                    let adminSocketObject = io.nsps['/chat'].connected[sk];
                    adminSocketObject.join(room.id);

                    //define customer Id depend on type of room
                    let customerId = room.roomType === RoomTypes.DEFAULT ? customer.id:customer.fb_id;
                    console.log(customerId);
                    socket.broadcast.to(adminSocketObject.id)
                        .emit('server-send-auto-assigned-room', {
                            roomId: room.id,
                            topicId: topic.selected,
                            topic: topic.topics.filter(e => e.id === topic.selected)[0].name,
                            customerName: customer.name,
                            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                            customerId: customerId,
                            room_id: room.id,
                            customer_name: customer.name,
                            roomType: room.roomType,
                            created_at: moment().format('YYYY-MM-DD hh:mm:ss')
                        });
                });

                //update room status have assignee
                await Room.update({status: 2,assignee : agent.id},{where : {id : room.id}});

                // push notidication to admin
                await pushNotification({
                    adminId: agent.id,
                    title: 'New room has been auto assigned',
                    body: `Customer Name: ${customer.name}, type: ${topic.topics.filter(e => e.id === topic.selected)[0].name}`
                });

            } catch (err) {
                console.log('loi client join room', err);
                socket.emit('server-send-authorized', {success: false, message: err.message});
            }

        });

        /**
         * On Listening admin or customer send message
         */
        socket.on('client-send-message', (msg, ack) => {
            console.log("msg from admin", msg);
            let roomId = msg.roomId;
            let senderId = msg.senderId;
            let name = msg.name;
            let message = msg.message.content;
            let type = msg.message.type || 100;
            let fileName = msg.message.name;
            let roomType = msg.roomType || RoomTypes.DEFAULT;

            console.log('roomtype', roomType);
            console.log("customer id", msg.customerId);

            Message
                .create({room_id: roomId, sender_id: senderId, content: message, message_type: type})
                .then(async newMessage => {
                    //TODO: send message to facebook
                    if (roomType === RoomTypes.FACEBOOK) {
                        let facebookId = msg.customerId;
                        sendTextMessage(facebookId, message);
                    } else {
                        socket.broadcast.to(roomId).emit('server-send-message', {
                            name, message, type, senderId,
                            messageId: newMessage.id,
                            createdAt: newMessage.created_at,
                            roomId: roomId
                        });
                    }
                    return ack({
                        name, message, type, senderId,
                        messageId: newMessage.id,
                        createdAt: newMessage.created_at,
                        roomId: roomId,
                        fileName: fileName
                    });
                })
                .catch(err => console.log(err.message));
        });

        socket.on('admin-send-action-rating', (room) => {
            let roomId = room.roomId || room.room_id;
            socket.broadcast.to(roomId).emit('server-send-rating');
        });

        //todo : client rating conversation
        socket.on('client-send-rating', (action) => {
            let roomId = action.roomId || action.room_id;
            console.log({roomId});
        });

        //todo : emit broadcast message be typing
        socket.on('client-send-typing', ({roomId}) => {
            socket.broadcast.to(roomId).emit('server-send-typing', {isTyping: true});
        });

        //todo : emit broadcast message be seen
        socket.on('client-send-seen', ({roomId}) => {
            socket.broadcast.to(roomId).emit('server-send-seen', {isSeen: true});
        });

        //todo : close chat
        socket.on('client-request-close', (ack) => {
            console.log("Client request close room");
            //todo: how many socket in socket.room

            //emit count socket
            socket.broadcast.emit('admin-count-socket',--count);
            //todo : admin and customer exit room -> update rooms status = 3


            //todo: send close room event to admin
            socket.broadcast.to(socket.room).emit('client-close-room', socket.room);

            //todo: confirm to client
            return ack({
                "result": true
            });
        });

        socket.on('disconnect', () => {
            //todo : admin get count
            io.of('/chat').to('admin').emit('admin-count-admin-online',getNumberOfAdmin());
            console.log(`có người ${socket.id} thoát kết nối nè`);
        });
    });
};
