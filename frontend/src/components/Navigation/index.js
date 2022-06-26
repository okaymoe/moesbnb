import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="navbar">
        <NavLink exact to="/">
          <img className="logo" src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png" alt="MoeBnB"></img>
        </NavLink>

        <div className="nav_center">
          <input type="text"/>
          <img src="https://img.icons8.com/material-rounded/24/000000/search.png" alt="search"/>
        </div>

        <div className="nav_right">
          <div className="nav_button">
            <img src="https://img.icons8.com/material-outlined/24/000000/menu--v1.png" alt="menu"/>
            <img id="avi" src="https://img.icons8.com/material/24/000000/user-male-circle--v1.png" alt="navbutton"/>
          </div>
        </div>

        
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;