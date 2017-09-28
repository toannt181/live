import sequelize from '../config/sequelize.config';
import Sequelize from 'sequelize';

const Topic = sequelize.define('topics', {
    id : {primaryKey: true, autoIncrement: true, type:Sequelize.INTEGER},
    name : {type : Sequelize.STRING}
},{
    timestamps : true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});

export default Topic;