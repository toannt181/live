import Sequelize from 'sequelize';
/**
 * Sequelize
 */

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME,process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port : process.env.MYSQL_PORT,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });

export default sequelize;