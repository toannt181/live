import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function tabReducer(state = initialState.activeTabId, action) {
    switch (action.type) {

        //TODO: CHANGE TAB
        case types.CHANGE_TAB:
            return action.tabId;


        //TODO: DEFAULT CASE
        default:
            return state;
    }
}
