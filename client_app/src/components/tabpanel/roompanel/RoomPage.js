import React, {PropTypes} from 'react';
import RoomList from './RoomList';

const RoomPage = ({rooms, joinRoom, reJoinRoom}) => {
    return(
        <div className="tab-content br-n pn">
            <div className="tab-pane active">
                <div className="row">
                    <div className="card-box table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>Type</th>
                                <th>Customer</th>
                                <th>Created at</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <RoomList
                                rooms={rooms}
                                joinRoom={joinRoom}
                                reJoinRoom={reJoinRoom}
                            />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

RoomPage.propTypes = {
    rooms: PropTypes.array.isRequired,
    joinRoom: PropTypes.func.isRequired
};

export default RoomPage;
