import React from 'react';
import './Home.css'
import '../Banner'
import Banner from '../Banner/index'
import Card from "../Card/index";

function Home() {
    return (
        <div className='home'>
            <Banner />
                <h1>Our favorite spots this week!</h1>
            <div className='home__section'>
            </div>
        </div>
    )
}

export default Home;