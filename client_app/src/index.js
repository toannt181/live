import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Router, browserHistory} from 'react-router';  //clear URL
import routes from './route';  //route cua react
import {Provider} from 'react-redux';
import {loadAllRooms} from "./actions/roomActions";
import startConnection from './middleware/chatSocket';
import {applyMiddleware} from 'redux';
import _ from 'lodash';
import saveState from './middleware/localStorageDump';

const store = configureStore();

startConnection(store);

store.dispatch(loadAllRooms());
store.dispatch({type: 'LOAD_LOCAL_STORAGE'});
store.subscribe(_.throttle(() => {
    saveState(
        store.getState()
    );
}, 1000));


render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
  document.getElementById('app')
);
