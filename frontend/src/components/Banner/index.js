import React, {useState} from 'react';
import './Banner.css';
import { useSelector } from 'react-redux';
import Search from "../Search/index"

function Banner() {
    const sessionUser = useSelector(state => state.session.user);
    const [showSearch, setShowSearch] = useState(false);
    return (
        !sessionUser &&
        <div className='banner'>
            <div className="banner_info">
                <h1>Get out and stretch your imagination</h1>
                <h5>Plan a different kind of getaway</h5> 
            </div>
            <p id="plsaccount">Sign in or Sign Up above to see spots!</p>      
        </div>

    );
}

export default Banner;