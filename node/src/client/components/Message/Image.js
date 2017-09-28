import React from 'react';

export default class Image extends React.Component {
    render() {
        let msg = this.props.msg;
        return (
            <li className={msg.typeSender}>
                <div className="image">
                    <div className="content">
                        <img src={this.props.content} alt=""/>
                        <time>{msg.time}</time>
                    </div>
                </div>
            </li>
        );
    }
}


