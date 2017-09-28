import sequelize from '../config/sequelize.config';
import Sequelize from 'sequelize';

const Customer = sequelize.define('customers', {
    id : {primaryKey: true, autoIncrement: true, type:Sequelize.INTEGER},
    name : {type : Sequelize.STRING},
    phone : {type : Sequelize.STRING},
    email : {type : Sequelize.STRING},
    fb_id : {type : Sequelize.STRING}
},{
    timestamps : true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});

export default Customer;