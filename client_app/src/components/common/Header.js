import React, {PropTypes} from 'react';
import { Link, IndexLink} from 'react-router';

const Header = () => {
  return(

    <div className="topbar">

      <div className="topbar-left">
        <div className="text-center">
          <a href="index.html" className="logo"><i className="icon-magnet icon-c-logo"></i><span>Ub<i className="md md-album"></i>ld</span></a>
        </div>
      </div>

      <div className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="">
            <div className="pull-left">
              <button className="button-menu-mobile open-left waves-effect waves-light">
                <i className="md md-menu"></i>
              </button>
              <span className="clearfix"></span>
            </div>

            <form role="search" className="navbar-left app-search pull-left hidden-xs">
              <input type="text" placeholder="Search..." className="form-control"/>
                <a href=""><i className="fa fa-search"></i></a>
            </form>


            <ul className="nav navbar-nav navbar-right pull-right">
              <li className="hidden-xs">
                <a href="#" id="btn-fullscreen" className="waves-effect waves-light"><i className="icon-size-fullscreen"></i></a>
              </li>

              <li className="dropdown top-menu-item-xs">
                <a href="" className="dropdown-toggle profile waves-effect waves-light" data-toggle="dropdown" aria-expanded="true"><img src="/vendor/light/assets/images/users/avatar-1.jpg" alt="user-img" className="img-circle"/> </a>
                <ul className="dropdown-menu">
                  <li id="profile"><a href="/admin/profile?id={{Auth::user()->id}}"><i className="ti-user m-r-10 text-custom"></i> Profile</a></li>
                  <li><a href="javascript:void(0)"><i className="ti-settings m-r-10 text-custom"></i> Settings</a></li>
                  <li><a href="javascript:void(0)"><i className="ti-lock m-r-10 text-custom"></i> Lock screen</a></li>
                  <li className="divider"></li>
                  <li><a href=""><i className="ti-power-off m-r-10 text-danger"></i> Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>



  );
};

export default Header;
