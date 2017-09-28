import React, {PropTypes} from 'react';
import { Link, IndexLink} from 'react-router';

const LeftBar = () => {
  return(


    <div className="left side-menu">
      <div className="sidebar-inner slimscrollleft">
        <div id="sidebar-menu">
          <ul>

            <li className="text-muted menu-title">Navigation</li>

            <li className="has_sub">
              <a href="/dashboard" className="waves-effect"><i className="ti-home"></i> <span> Dashboard </span></a>
            </li>

            <li className="has_sub">
              <a href="javascript:void(0);" className="waves-effect"><i className="ti-menu-alt"></i><span>Accounts </span> <span className="menu-arrow"></span></a>
              <ul className="list-unstyled">
                <li><a href="/admin">Admin</a></li>
                <li><a href="/customers">Customer</a></li>
                <li><a href="/topics">Topic</a></li>
                <li><a href="/files">File</a></li>

              </ul>
            </li>
            <li className="has_sub">
              <a href="javascript:void(0);" className="waves-effect"><i className="ti-share"></i><span>Room </span> <span className="menu-arrow"></span></a>
              <ul className="list-unstyled">
                <li><a href="/room">Chat Management</a></li>
                <li><a href="/history">History</a></li>

              </ul>
            </li>
          </ul>
          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>


);
};

export default LeftBar;
