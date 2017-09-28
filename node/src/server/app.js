const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config({path: '.env'});
const ChatSocketEvent = require('./ChatSocketEvent');
const chalk = require('chalk');
const webhook = require('./routes/webhook');

/**
 * config https
 */
// const fs = require('fs');
// // This line is from the Node.js HTTPS documentation.
// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// };

/**
 * Create Express server.
 */
const app = express();

// var server = https.createServer(options, app);
// server.listen(app.get('port'), () => {
//     console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
//     console.log('  Press CTRL-C to stop\n');
// });

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, '../..', 'static')));

var server = require('http').createServer(app);
/**
 * Config Socket with adapter-redis
 */
const io = require('socket.io').listen(server);
const redis = require('socket.io-redis');
io.adapter(redis({host: process.env.REDIS_HOST, port: process.env.REDIS_PORT}));

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/', webhook);

// RUN SERVER
server.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

ChatSocketEvent(io);



