import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import ManageRoomPage from './components/room/ManageRoomPage';

export default (
  <Route path="/room" component={App}>
    <IndexRoute component={ManageRoomPage}/>
  </Route>
);
