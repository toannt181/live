import React, {PropTypes} from 'react';
import * as messageTypes from '../../../config/messageTypes';

const MessageListRow = ({message, messageId, closed, status, handleSelectTagOfRoom}) => {
    let content = null;
    let metaLink = null;
    let setTagOfRoom = null;
    if (message.message.type == messageTypes.DEFAULT_MESSAGE) {
        content = <p>{message.message.content}</p>;
    } else if ( message.message.type == messageTypes.CLOSE_MESSAGE) {
        content = <p>[{message.senderName}]: {message.message.content}</p>;
        setTagOfRoom =
            <li className="room-tag li-chat">
                <div className="p-20">
                    <select
                        className="selectpicker"
                        value={status}
                        onChange={handleSelectTagOfRoom}
                        disabled={status == 3}
                        data-style="btn-default btn-custom">
                        <option value={2}>Active</option>
                        <option value={3}>Close</option>
                    </select>
                </div>
            </li>;
    } else if (message.message.type == messageTypes.IMAGE_MESSAGE) {
        content =
            <div>
                <a data-fancybox="gallery" href={message.message.content}>
                    <img src={message.message.content}/>
                </a>
            </div>
    } else if(message.message.type == messageTypes.PDF_MESSAGE) {
        content = <a href={message.message.content}><p><img src={"/images/pdf_icon.png"} width={15} height={15}/>{message.message.name}</p></a>;
    } else if(message.message.type == messageTypes.WORD_MESSAGE) {
        content = <a href={message.message.content}><p><img src={"/images/word_icon.png"} width={15} height={15}/>{message.message.name}</p></a>;
    } else if(message.message.type == messageTypes.EXCEL_MESSAGE) {
        content = <a href={message.message.content}><p><img src={"/images/excel_icon.png"} width={15} height={15}/>{message.message.name}</p></a>;
    }

    let className = message.message.type != messageTypes.IMAGE_MESSAGE? "li-chat":"li-image";

    if (typeof message.metaLink === 'object' && message.metaLink != null) {
        metaLink = <li
            className={message.senderId == 0? `self-metalink ${className}`:`other-metalink ${className}`}
            data-toggle="tooltip"
            data-placement="left"
            title={message.createdAt?message.createdAt:"time sent error"}
            >
            <div className="meta-box">
                <div className="box-title">
                    <div className="box-image">
                        <a href={message.message.content} target="_blank">
                            <img src={message.metaLink.image}/>
                        </a>
                    </div>
                    <a href={message.message.content} target="_blank">
                        <div className="font-weight-bold"><p>{message.metaLink.title}</p></div>
                        <div><p>{message.metaLink.description}</p></div>
                    </a>
                </div>
            </div>
        </li>
    }

    return(
        <span>
        <li key={messageId}
            className={message.senderId == 0? `self ${className}`:`other ${className}`}
            data-toggle="tooltip"
            data-placement="left"
            title={message.createdAt?message.createdAt:"time sent error"}
        >
            {content}
        </li>
            {metaLink}
            {setTagOfRoom}
        </span>
    );
};

MessageListRow.propTypes = {
    message: PropTypes.object.isRequired
}

export default MessageListRow;
