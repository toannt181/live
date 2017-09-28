import Topic from './Topic';
import Admin from './Admin';
import Customer from  './Customer';
import Room from './Room';
import Message from './Message';

Room.belongsTo(Topic,{foreignKey: 'topic_id'});
Topic.hasMany(Room,{foreignKey: 'topic_id'});

Room.belongsTo(Admin,{foreignKey : 'assignee'});
Admin.belongsTo(Room,{foreignKey : 'id'});

Customer.hasMany(Message,{foreignKey: 'sender_id'});
Message.belongsTo(Customer,{foreignKey: 'sender_id'});

Room.hasMany(Message,{foreignKey: 'room_id'});
Message.belongsTo(Room,{foreignKey: 'room_id'});

export { Topic,Room,Admin,Customer,Message };