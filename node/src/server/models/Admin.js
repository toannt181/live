import sequelize from '../config/sequelize.config';
import Sequelize from 'sequelize';
const Admin = sequelize.define('admins', {
    id : {primaryKey: true, autoIncrement: true, type:Sequelize.INTEGER},
    name : {type : Sequelize.STRING},
    phone : {type : Sequelize.STRING},
    email : {type : Sequelize.STRING},
    password : {type : Sequelize.STRING},
    remember_token : {type : Sequelize.STRING},
},{
    timestamps : true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});

export default Admin;