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
            <Card
                src="https://media.nomadicmatt.com/2019/airbnb_breakup3.jpg"
                title="3 Bedroom Apartment in Chicago"
                description="Superhost with a stunning view of the beachside in Sunny Bournemouth"
                price="$130/night"
            />
            <Card
                src="https://thespaces.com/wp-content/uploads/2017/08/Courtesy-of-Airbnb.jpg"
                title="Penthouse in New York City"
                description="Enjoy the amazing sights of London with this stunning penthouse"
                price="$350/night"
            />
            <Card
                src="https://media.nomadicmatt.com/2018/apartment.jpg"
                title="1 Bedroom apartment"
                description="Superhost with great amenities and a fabolous shopping complex nearby"
                price="$70/night"
            />
            </div>
        </div>
    )
}

export default Home;