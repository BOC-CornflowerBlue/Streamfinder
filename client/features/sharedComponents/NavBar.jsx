import React from 'react';
import './NavBar.css';

import LogOut from './LogOutIcon';
import HomeIcon from './HomeIcon';
import UserIcon from './UserIcon';
import SearchBarActive from '../search/SearchBarActive';

const NavBar = (props) => {
  return (
    <>
    <div className="nav-header">
      <h1 className="nav-title">Streamfinder</h1>
      <div className="nav-icons">
        <LogOut updateSession={ props.updateSession } />
        <UserIcon />
        <HomeIcon />
      </div>
    </div>
    <hr/>
    { props.displaySearch && <SearchBarActive handleSearch={ props.handleSearch } /> }
    <hr/>
    </>
  );
};

export default NavBar;