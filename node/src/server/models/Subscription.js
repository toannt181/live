import sequelize from '../config/sequelize.config';
import Sequelize from 'sequelize';


const Subscription = sequelize.define('subscriptions', {
    id : {primaryKey: true, autoIncrement: true, type:Sequelize.INTEGER},
    adminId : {type:Sequelize.INTEGER},
    subscription : {type : Sequelize.STRING}
});

export default Subscription;