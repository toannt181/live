import {adminSendMessage} from '../facebook/sendMessageSocket';

const express = require('express');
const router = express.Router();
let TOKEN = require('../facebook/webhook.config');
import {receivedMessage} from '../facebook/receivedMessage';
import {receivedPostback} from '../facebook/receivedPostback';

router.get('/webhook', function (req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === TOKEN.APP_TOKEN) {
        console.log('Validating webhook');
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error('Failed validation. Make sure the validation tokens match.');
        res.sendStatus(403);
    }
});

router.get('/test', (req, res) => {
    adminSendMessage(TOKEN.LIO_ID, 'hahaha');
});

/**
 * todo : check all message received
 */
router.post('/webhook', function (req, res) {
    var data = req.body;

    const io = req.io;

    // Make sure this is a page subscription
    if (data.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function (entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;

            // Iterate over each messaging event
            entry.messaging.forEach(function (event) {

                console.log('POST WEBHOOK', event);

                //Receive normal message
                if (event.message && event.sender.id !== TOKEN.FANPAGE_ID) {
                    receivedMessage(event, io);

                    //Receive postback message
                } else if (event.postback) {
                    receivedPostback(event);

                    //Undefined message
                } else {
                    console.log('Webhook received unknown event');
                }
            });

        });

        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know
        // you've successfully received the callback. Otherwise, the request
        // will time out and we will keep trying to resend.
        res.sendStatus(200);
    }
});

module.exports = router;