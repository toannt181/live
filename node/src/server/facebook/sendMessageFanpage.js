import {callSendAPI} from './callApi';

export let sendTextMessage = function (recipientId, text) {
    const messageData = {
        text: text
    };

    //todo : async - await
    callSendAPI(recipientId, messageData);
};

export let sendAttachmentMessage = function (recipientId, attachment) {
    console.log('SEND ADMIN MESSAGE attachment......', recipientId, attachment);

    const messageData = {
        attachment: {
            type: 'file',
            payload: {
                url: attachment
            }
        }
    };

    //todo : async - await
    callSendAPI(recipientId, messageData);
};

export let sendImageMessage = function (recipientId, image) {
    console.log('SEND ADMIN MESSAGE image ......', recipientId, image);

    const messageData = {
        attachment: {
            type: 'image',
            payload: {
                url: image
            }
        }
    };

    //todo : async - await
    callSendAPI(recipientId, messageData);
};

export let sendAudioMessage = function (recipientId, audio) {
    console.log('SEND ADMIN MESSAGE audio ......', recipientId, audio);

    const messageData = {
        attachment: {
            type: 'audio',
            payload: {
                url: audio
            }
        }
    };

    //todo : async - await
    callSendAPI(recipientId, messageData);
};

export let sendVideoMessage = function (recipientId, video) {
    console.log('SEND ADMIN MESSAGE video ......', recipientId, video);

    const messageData = {
        attachment: {
            type: 'video',
            payload: {
                url: video
            }
        }
    };

    //todo : async - await
    callSendAPI(recipientId, messageData);
};
