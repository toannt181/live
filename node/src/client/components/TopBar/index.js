import React from 'react';
import {connect} from 'react-redux';

class TopBar extends React.Component {

    render() {
        return (
            <div className="header">
                <h2>Room: {this.props.customer.topicName}</h2>
                <p><span
                    ref="name">{this.props.room.assignee ? 'Admin ' + this.props.room.assignee : 'Waiting room'}</span>
                </p>
            </div>
        );
    }
}

function mapToProps(state) {
    return {
        customer: state.customer,
        room: state.room,
    };
}

export default connect(mapToProps)(TopBar);