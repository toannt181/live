import {FETCH_TOPIC_FAILURE,FETCH_TOPIC_SUCCESS,FETCH_TOPIC} from './constants';

export function fetchTopic() {
    return {
        type : FETCH_TOPIC
    };
}
export function fetchTopicSuccess(topics) {
    return {
        type : FETCH_TOPIC_SUCCESS,
        topics
    };
}
export function fetchTopicFailure(message) {
    return {
        type : FETCH_TOPIC_FAILURE,
        message
    };
}