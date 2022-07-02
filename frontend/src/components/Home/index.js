import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSpots } from '../../store/spots';
import SpotCard from '../SpotCard';
import Card from "../Card"
import Banner from "../Banner"


const Home = () => {
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => Object.values(state.spots).map(spot => {
    return spot;
  }));

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);


  return (
    <div>
        <div>
            <Banner/>
        </div>
        <p id="home_title">Check out some of our available spots below!</p>
        <ul className='container-home'>
        {spots.map(spot => {
        return (
          spot.Images &&
          <li className="user-listings__cards_home" >
            <SpotCard spot={spot} />
          </li>
        )
        })}
        </ul>
    </div>
   
  )
}

export default Home;




// import React from 'react';
// import './Home.css'
// import '../Banner'
// import Banner from '../Banner/index'
// import Card from "../Card/index";

// function Home() {
//     return (
//         <div className='home'>
//             <Banner />
//                 <h1>Our favorite spots this week!</h1>
//             <div className='home__section'>

//             </div>
//         </div>
//     )
// }

// export default Home;