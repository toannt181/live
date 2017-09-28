import sequelize from '../config/sequelize.config';
import Sequelize from 'sequelize';


const Message = sequelize.define('messages', {
    id: {primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER},
    room_id: {type: Sequelize.INTEGER},
    sender_id: {type: Sequelize.INTEGER},
    content: {type: Sequelize.STRING},
    message_type: {type: Sequelize.INTEGER}
}, {
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
});



function findRoom(fbID) {
    const lastMesssage = Message.findOne({
        attributes: ['id', 'room_id'],
        where: {
            sender_id: fbID
        },
        order: [['id', 'DESC']]
    })
        .then(res => {
            console.log(res);
            const room = Room.findOne({
                attributes: ['id', 'topic_id', 'status'],
                where: {
                    id: res
                },
                order: [['id', 'DESC']]
            })
                .then(res => {

                });
        });



    //Break search complete until here
    if (room) {
        console.log('Find room id = %s status = %s', room.dataValues.id, room.dataValues.status);
        if (room.dataValues.status === 1) {
            return room.dataValues;
        }
    }

    return null;
};

export default Message;