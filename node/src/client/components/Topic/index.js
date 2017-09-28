import React from 'react';
import {selectTopic} from '../../actions/action';

class Topic extends React.Component {

    handleChange(id) {
        const {dispatch} = this.props;
        dispatch(selectTopic(id));
    }

    isSelected(i) {
        return 'topic-tag' + (this.props.selected === i ? ' active' : '');
    }

    getTopics() {
        return this.props.topics.map(item =>
            <span className={this.isSelected(item.id)} key={item.id} onClick={this.handleChange.bind(this, item.id)}>
                {item.name}
                </span>
        );
    }

    render() {
        return (
            <div className="d-flex flex-wrap">
                {this.getTopics()}
            </div>
        );
    }
}


export default Topic;