/**
 * chua cac du lieu de config store
 */

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import {chatMiddleware} from '../middleware/chatSocket';
import localStorageLoad from '../middleware/localStorageLoad';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(localStorageLoad, thunk, reduxImmutableStateInvariant(), chatMiddleware)
  );
}
