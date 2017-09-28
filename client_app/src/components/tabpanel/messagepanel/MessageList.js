import React, {PropTypes} from 'react';
import MessageListRow from './MessageListRow';
import * as Helper from '../../../utils/manageRoomHelper';

const MessageList = ({messages, getMetaLink, roomId, closed, status, handleSelectTagOfRoom}) => {
    return(

        <ol className="chat">
            {messages.map((message) =>{
                if(typeof message.metaLink === 'boolean' && message.metaLink == false) {
                    getMetaLink(message, roomId);
                }

                let messageId = Helper.getIndexOfMessageInArray(message, messages);
                return (
                <MessageListRow
                    message={message}
                    messageId={messageId}
                    key={messageId}
                    status={status}
                    handleSelectTagOfRoom={handleSelectTagOfRoom}
                />
                )})
            }
        </ol>

    );
};

MessageList.propTypes = {
    messages: PropTypes.array.isRequired
}

export default MessageList;
