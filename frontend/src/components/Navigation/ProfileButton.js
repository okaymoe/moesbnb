import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import "./ProfileButton.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <div className="profcontainer">
      <button className="navButton" onClick={openMenu}>
        <span>
          <img id="avi" src="https://img.icons8.com/material-outlined/24/000000/menu--v1.png" alt="menu"/>
        </span>
        </button>
        {showMenu && (
        <ul className="navbar__profile-dropdown">
          <li className='navbar__user-info'>Hi {user.username}!</li>
          <li className='navbar__user-info navbar__underline'>{user.email}</li>
          <li className='navbar__dropdown-links navbar__dropdown--nav' key={`newSpot`}><Link className='navbar__dropdown--nav'to='/spots'>Host your Spot</Link></li>
          <li className='navbar__dropdown-links navbar__dropdown--nav' key={`mySpot`}><Link className='navbar__dropdown--nav'to={`/users/${user.id}/spots`}>Your spots</Link></li>
          <li>
            <button className="logoutbutton" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
      
      </div>
      
    </>
  );
}

export default ProfileButton;