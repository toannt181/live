import React, {PropTypes} from 'react';

const ChatInput = ({messageInput, onChange, onKeyUp, fileUpload, adminSendActionRating, roomId, closed, handleSelectTagOfRoom, status}) => {
    return (

        <div className="chat-footer">
            <input
                className="textarea"
                type="text"
                placeholder="Type here!"
                onChange={onChange}
                value={messageInput}
                onKeyUp={onKeyUp}
                disabled={closed?"disabled" : ""}
            />
            <div className="btn-footer">
                <button className="btn-primary waves-effect waves-light pull-right" > <i className="fa fa-star" value={roomId} onClick={adminSendActionRating}></i> </button>
                <button className="fileupload btn-pink waves-effect waves-light pull-right">
                    <i className="glyphicon glyphicon-picture"></i>
                    <input type="file" accept="image/*" className="upload" onChange={fileUpload}/>
                </button>
                <button className="fileupload btn-purple waves-effect waves-light pull-right">
                    <i className="glyphicon glyphicon-paperclip"></i>
                    <input type="file" onChange={fileUpload} className="upload"/>
                </button>
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
        </div>
    );

}

ChatInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    messageInput: PropTypes.string.isRequired
};

export default ChatInput;
