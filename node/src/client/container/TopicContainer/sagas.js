import { call, put } from 'redux-saga/effects';
import {API_GET_TOPIC_URL} from '../../constants/Server';
import {takeLatest} from 'redux-saga';
import {FETCH_TOPIC, FETCH_TOPIC_SUCCESS} from './constants';
import {fetchTopicFailure,fetchTopicSuccess} from './actions';
import {addTopic} from '../../actions/action';

function fetchTopic() {

    return fetch(API_GET_TOPIC_URL, {mode: 'cors',})
        .then( resolve => resolve.json());
}

// Individual exports for testing
function* handleFetchTopic() {
    try{
        const topics = yield call(fetchTopic);
        yield put(fetchTopicSuccess(topics));
    }catch (err) {
        yield put(fetchTopicFailure(err.message));
    }

}

function* handleFetchTopicSuccess(action) {
    yield put(addTopic(action.topics));
}

export function* handleFetchTopicSuccessSagas() {
    yield* takeLatest(FETCH_TOPIC_SUCCESS,handleFetchTopicSuccess);
}

export function* fetchTopicSagas() {
    console.log('chay vao saga fetchTopic');
    yield* takeLatest(FETCH_TOPIC,handleFetchTopic);
}
