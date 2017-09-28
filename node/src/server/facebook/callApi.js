import RequestPromise from 'request-promise';
import request from 'request';

let TOKEN = require('./webhook.config');

export const callSendAPI = function (recipientId, messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: TOKEN.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {
                id: recipientId
            },
            message: messageData
        }
    },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const recipientId = body.recipient_id;
                const messageId = body.message_id;

                console.log('Successfully sent generic message with id %s to recipient %s',
                    messageId, recipientId);
            } else {
                console.error('Unable to send message.');
            }
        });


};


export function callGetUserInfo(fbId) {
    return RequestPromise({
        uri: 'https://graph.facebook.com/v2.6/' + fbId,
        qs: {access_token: TOKEN.PAGE_ACCESS_TOKEN},
        method: 'GET',
        json: true
    })
        .then(body => Promise.resolve(body.first_name + ' ' + body.last_name));
}
