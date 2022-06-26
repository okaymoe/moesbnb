import React, {useState} from 'react';
import './Banner.css';
import Search from "../Search/index"

function Banner() {
    const [showSearch, setShowSearch] = useState(false);
    return (
        <div className='banner'>
            <div className="searchdatescontainer">
                {showSearch && <Search/>}
                
                <button onClick={() => 
                setShowSearch(!showSearch)}
                className="banner_searchButton">
                Search Dates
                </button>
            </div>
            <div className="banner_info">
                <h1>Get out and stretch your imagination</h1>
                <h5>Plan a different kind of getaway</h5>       
            </div>
        </div>

    );
}

export default Banner;