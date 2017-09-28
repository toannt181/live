import server from '../app';

/**
 * Config Socket with adapter-redis
 */
let configIo = () => {
    const io = require('socket.io').listen(server);
    const redis = require('socket.io-redis');
    io.adapter(redis({host : process.env.REDIS_HOST, port : process.env.REDIS_PORT}));
    return io;
};

export default configIo();