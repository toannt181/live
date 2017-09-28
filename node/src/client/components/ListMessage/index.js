import React from 'react';
import Rating from '../Message/Rating';
import Notification from '../Message/Notification';
import Default from '../Message/Default';
import Image from '../Message/Image';
import * as MessageTypes from '../../constants/MessageTypes';



function getListChat(messages) {
    return messages.map((e, i) => {
            //Type message default is undefined
        switch (e.message.type) {
        case MessageTypes.NOTIFICATION:
            return <Notification content={e.message.content} key={i}/>;
        case MessageTypes.RATING:
            return <Rating key={i}/>;
        case MessageTypes.IMAGE:
            return <Image key={i} msg={e} content={e.message.content}/>;
        default:
            return <Default msg={e} key={i}/>;
        }
    });
}

class ListMessage extends React.Component {



    render() {
        let listMsg = getListChat(this.props.messages);
        return (
            <ol className="chat">
                {listMsg}
            </ol>
        );
    }
}

export default ListMessage;