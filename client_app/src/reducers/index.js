import {combineReducers} from 'redux';
import ajaxCallInProgress from './ajaxStatusReducer';
import tabs from './tabReducer';
import rooms from './roomReducers';
import activeTabId from './activeTabReducer';

const rootReducer = combineReducers({
    ajaxCallInProgress,
    tabs,
    rooms,
    activeTabId
});

export default rootReducer;
