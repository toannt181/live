import React, {PropTypes} from 'react';
import RoomPage from './roompanel/RoomPage';

const RoomTabPanel = ({rooms, tabId, joinRoom, reJoinRoom}) => {
    return(
        <RoomPage
            key={tabId}
            rooms={rooms}
            joinRoom={joinRoom}
            reJoinRoom={reJoinRoom}
        />
    );
};

RoomTabPanel.propTypes = {
    rooms: PropTypes.array.isRequired,
    joinRoom: PropTypes.func.isRequired,
    tabId: PropTypes.number.isRequired
};

export default RoomTabPanel;
