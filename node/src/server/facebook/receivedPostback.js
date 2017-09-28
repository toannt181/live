
import {createRoom} from './receivedMessage';
import {sendTemplateMessage} from './sendMessageFanpage';

export function receivedPostback(event) {
    const senderID = event.sender.id;
    const recipientID = event.recipient.id;
    const timeOfPostback = event.timestamp;

    // The 'payload' param is a developer-defined field which is set in a postback
    // button for Structured Messages.
    const payload = event.postback.payload;

    console.log('Received postback from user %d and page %d with payload %s', senderID, recipientID, payload);

    // Handle postback message
    switch (payload) {

    case 'GET_STARTED_PAYLOAD':
        console.log('GET_STARTED_PAYLOAD');
        break;
    case 'RESPONSE_SELECT_TOPIC_PAYLOAD':
        console.log('RESPONSE_SELECT_TOPIC_PAYLOAD');
        break;
    case 'EMERGENCY_PAYLOAD':
        console.log('EMERGENCY_PAYLOAD');
        break;
    default:
        console.log('Detect postpone fail');

    }

}