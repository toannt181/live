var express = require('express');
var router = express.Router();
var request = require('request');


module.exports = (app,io) => {

    /**
     * Get request
     */
    app.get('/', (req, res) => {
        console.log(io);

        res.status(200).end(renderFullPage());
    });

    app.get('/webhook', function(req, res) {
        if (req.query['hub.mode'] === 'subscribe' &&
            req.query['hub.verify_token'] === 'mysecret') {
            console.log('Validating webhook');
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error('Failed validation. Make sure the validation tokens match.');
            res.sendStatus(403);
        }
    });
// Message processing
    app.post('/webhook', function (req, res) {
        var data = req.body;
        console.log('data',JSON.stringify(data));
        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function(entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;
            // Iterate over each messaging event
            entry.messaging.forEach(function(event) {
                if (event.message) {
                    receivedMessage(event);
                    console.log('receivedMessage',event);
                } else if (event.postback) {
                    receivedPostback(esvent);
                    console.log('receivedPostback',event);
                } else {
                    console.log('Webhook received unknown event: ', event);
                }
            });
        });

        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know
        // you've successfully received the callback. Otherwise, the request
        // will time out and we will keep trying to resend.
        res.sendStatus(200);
    });

// Incoming events handling
    function receivedMessage(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;

        console.log('Received message for user %d and page %d at %d with message:',
            senderID, recipientID, timeOfMessage);
        console.log(JSON.stringify(message));

        var messageId = message.mid;

        var messageText = message.text;
        var messageAttachments = message.attachments;

        if (messageText) {
            // If we receive a text message, check to see if it matches a keyword
            // and send back the template example. Otherwise, just echo the text we received.
            switch (messageText) {
            case 'generic':
                sendGenericMessage(senderID);
                break;

            default:
                sendTextMessage(senderID, messageText);
            }
        } else if (messageAttachments) {
            sendTextMessage(senderID, 'Message with attachment received');
        }
    }

    function receivedPostback(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfPostback = event.timestamp;

        // The 'payload' param is a developer-defined field which is set in a postback
        // button for Structured Messages.
        var payload = event.postback.payload;

        console.log('Received postback for user %d and page %d with payload \'%s\' ' +
            'at %d', senderID, recipientID, payload, timeOfPostback);

        // When a postback is called, we'll send a message back to the sender to
        // let them know it was successful
        sendTextMessage(senderID, 'Postback called');
    }

//////////////////////////
// Sending helpers
//////////////////////////
    function sendTextMessage(recipientId, messageText) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: messageText
            }
        };

        callSendAPI(messageData);
    }

    function sendGenericMessage(recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        elements: [{
                            title: 'rift',
                            subtitle: 'Next-generation virtual reality',
                            item_url: 'https://www.oculus.com/en-us/rift/',
                            image_url: 'http://messengerdemo.parseapp.com/img/rift.png',
                            buttons: [{
                                type: 'web_url',
                                url: 'https://www.oculus.com/en-us/rift/',
                                title: 'Open Web URL'
                            }, {
                                type: 'postback',
                                title: 'Call Postback',
                                payload: 'Payload for first bubble',
                            }],
                        }, {
                            title: 'touch',
                            subtitle: 'Your Hands, Now in VR',
                            item_url: 'https://www.oculus.com/en-us/touch/',
                            image_url: 'http://messengerdemo.parseapp.com/img/touch.png',
                            buttons: [{
                                type: 'web_url',
                                url: 'https://www.oculus.com/en-us/touch/',
                                title: 'Open Web URL'
                            }, {
                                type: 'postback',
                                title: 'Call Postback',
                                payload: 'Payload for second bubble',
                            }]
                        }]
                    }
                }
            }
        };

        callSendAPI(messageData);
    }

    function callSendAPI(messageData) {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: 'EAACZBNfyZCgvkBAEo1fZC5ccScxKHB15BA7l71i5J5ZBMdfFHOc6B5FcQWX3aDpSbDOm8qG1eLRlgnFkpB7cUmIkDnEK2OPBCMAR7YoIWnG8fXCLEk8UJ82b7svl35Ceh72VLaZAktU3kJ3yQAvc2i9n9K9CJ6nzZC4tLaU7slg8PpBvGMyuVO' },
            method: 'POST',
            json: messageData

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;

                console.log('Successfully sent generic message with id %s to recipient %s',
                    messageId, recipientId);
            } else {
                console.error('Unable to send message.');
                console.error(response);
                console.error(error);
            }
        });
    }


    function renderFullPage() {
        return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700" rel="stylesheet">
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>React Redux Socket.io Chat</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
    }
};
