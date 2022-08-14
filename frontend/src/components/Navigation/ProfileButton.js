import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
    const history = useHistory();
    const sesh = useSelector(state => state.session);
    let userId;
    if (sesh.user) userId = sesh.user.id
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const handleDemoLogin = () => {
        const emails = ['demo@user.io', 'user1@user.io', 'user2@user.io'];
        return dispatch(sessionActions.login({
            credential: emails[Math.floor(Math.random()*emails.length)],
            password: 'password'
        }))
    }

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
    };

    return (
        <>
            <div className='nav-bar-btn-dropdown-container'>
                <button onClick={openMenu} id="nav-bar-profile-button">
                    <i className="fa-solid fa-bars fa-xl" id='nav-bar-profile-menu-icon'></i>
                    <svg id='nav-bar-profile-icon' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0Zm0,18.3a8.28,8.28,0,0,1-6.49-3.14,8.12,8.12,0,0,1,4.21-2.88,4.25,4.25,0,1,1,4.56,0,8.12,8.12,0,0,1,4.21,2.88A8.28,8.28,0,0,1,10,18.3Z"/>
                    </svg>
                </button>
                {showMenu && user && (
                    <div className="nav-bar-profile-dropdown-menu">
                        <div id='nav-pd-user-info'>
                            <p className='nav-pd-text' id='nav-pd-username'>{user.username}</p>
                            <p className='nav-pd-text' >{user.email}</p>
                        </div>
                        <p className='nav-pd-text' id='nav-pd-profile' onClick={() => history.push(`/users/${userId}`)}>My Profile</p>
                        <p className='nav-pd-text' id='nav-pd-logout' onClick={logout}>Log Out</p>
                    </div>
                )}
                {showMenu && !user && (
                    <div className="nav-bar-profile-dropdown-menu">
                        <p className='nav-pd-text' id='nav-pd-signup' onClick={() => history.push('/signup')}>Sign Up</p>
                        <p className='nav-pd-text' id='nav-pd-login' onClick={() => history.push('/login')}>Log in</p>
                        <p className='nav-pd-text' id='nav-pd-demologin' onClick={handleDemoLogin}>Demo Login</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfileButton;
