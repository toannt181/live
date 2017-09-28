import React, {PropTypes} from 'react';
import MessagePage from './messagepanel/MessagePage';

const MessageTabPanel = ({messages, tabId, topicName, onChange, messageInput, onKeyUp, fileUpload, getMetaLink, adminSendActionRating, closed, status, handleSelectTagOfRoom}) => {
    return(
        <MessagePage
            key={tabId}
            messages={messages}
            roomId={tabId}
            topicName={topicName}
            onChange={onChange}
            messageInput={messageInput}
            onKeyUp={onKeyUp}
            fileUpload={fileUpload}
            getMetaLink={getMetaLink}
            adminSendActionRating={adminSendActionRating}
            closed={closed}
            status={status}
            handleSelectTagOfRoom={handleSelectTagOfRoom}
        />
    );
};

export default MessageTabPanel;
