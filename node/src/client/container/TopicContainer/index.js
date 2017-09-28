import React from 'react';
import {connect} from 'react-redux';
import Topic from '../../components/Topic';
import {fetchTopic} from './actions';


class TopicContainer extends React.Component {

    render() {
        return(
            <div className="px8">
                <p>Select your topic's problem</p>
                <Topic {...this.props}/>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        topics: state.topic.topics,
        selected: state.topic.selected
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        // fetchTopic : () => dispatch(fetchTopic())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(TopicContainer);
