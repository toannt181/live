import sequelize from '../config/sequelize.config';
import Sequelize from 'sequelize';


const Room = sequelize.define('rooms', {
    id : {primaryKey: true, autoIncrement: true, type:Sequelize.INTEGER},
    topic_id : { type:Sequelize.INTEGER},
    status : {type : Sequelize.INTEGER},
    assignee : {type : Sequelize.INTEGER},
    closedAt : {type : Sequelize.DATE},
    room_type : {type: Sequelize.STRING}
},{
    timestamps : true,
    updatedAt: false,
    createdAt: 'created_at',

});

export default Room;