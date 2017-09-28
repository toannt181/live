import React from 'react';
import {connect} from 'react-redux';
import {closeChat, destroyStore, hideForm} from "../../actions/action";
import socket from "../../reducers/socket";


class ChatTitle extends React.Component {

    constructor(props) {
        super(props);
        this.changeIcon = this.changeIcon.bind(this);
        this.close = this.close.bind(this);
    }

    toggleChat() {
        $('.chat-body').slideToggle(this.changeIcon);
    }

    changeIcon() {
        this.arrowIcon.classList.toggle('fa-chevron-up');
        this.arrowIcon.classList.toggle('fa-chevron-down');
    }

    close(e) {
        e.stopPropagation();
        if (window.sessionStorage.getItem('jwtToken')) {
            const {dispatch} = this.props;
            this.props.socket.emit('client-request-close', ack => {
                console.log('CLOSE EVENT:', ack.success);
                window.sessionStorage.removeItem('jwtToken');
                dispatch(destroyStore());
                dispatch(hideForm(false));
            });
        }
        this.changeIcon();

        $('.bubble-body').removeClass('show');
        setTimeout(function () {
            $('.bubble').addClass('circle');
        }, 200);

    }

    render() {
        return (
            <div className="chat-title" onClick={this.toggleChat.bind(this)}>
                <div className="icon"><i className="fa fa-chevron-down" ref={arrowIcon => this.arrowIcon = arrowIcon}/>
                </div>
                <div className="title text-center">
                    SUPPORT {this.props.customer.topicName ? this.props.customer.topicName : ''}</div>
                <div className="icon text-right"><i className="fa fa-times" onClick={e => this.close(e)}/></div>
            </div>
        );
    }
}

function mapToProps(state) {
    return {
        customer: state.customer,
        room: state.room,
        socket: state.socket,
    };
}

export default connect(mapToProps)(ChatTitle);