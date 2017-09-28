import React, {PropTypes} from 'react';

const RoomListRow = ({room, joinRoom, reJoinRoom}) => {
    let status, action;
    if (room.status == 1) {
        status = <td><i className="fa fa-circle"></i> In-active</td>;
        action = <td><a value={room.id} className="btn btn-default btn-sm waves-effect waves-light btn-join-room" onClick={joinRoom}>
                Join</a></td>;
    } else if(room.status == 2) {
        let myStyle={color: '#a0d269'};
        status = <td><i className="fa fa-circle" style={myStyle}></i> Active</td>;
        action = <td><a value={room.id} onClick={reJoinRoom}>Re-join</a></td>;
    } else {
        status = <td><i className="fa fa-circle"></i> Closed</td>;
        action = null;
    }

    return(
        <tr key={room.id}>
            <td>{room.id}</td>
            <td>{room.topicName}</td>
            <td>{room.customerName}</td>
            <td>{room.createdAt}</td>
            {status}
            {action}
        </tr>
    );
};

RoomListRow.propTypes = {
    room: PropTypes.object.isRequired,
    joinRoom: PropTypes.func.isRequired
};

export default RoomListRow;
