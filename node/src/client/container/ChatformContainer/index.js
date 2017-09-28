import React from 'react';
import {connect} from 'react-redux';
import Chatform from '../../components/Chatform';
import * as MessageTypes from '../../constants/MessageTypes';
import {addMessage} from '../../actions/action';
import {registerToken} from './actions';


class ChatformContainer extends React.Component {
    render() {
        return (<Chatform {...this.props}/>);
    }
}


function mapStateToProps(state) {
    return {
        topic: state.topic,
        room: state.room,
        inputRegisters: state.inputRegisters,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendRegister: (params) => {
            dispatch(registerToken(params));
        }
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(ChatformContainer);