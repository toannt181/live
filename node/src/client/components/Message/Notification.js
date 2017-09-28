import React from 'react';

export default class Notification extends React.Component {
    render() {
        return (
            <div className="notification">
               <div className="content">{this.props.content}</div>
            </div>
        );
    }
}


