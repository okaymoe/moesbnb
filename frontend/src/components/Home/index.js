import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSpots } from '../../store/spots';
import SpotCard from '../SpotCard';
import Card from "../Card"
import Banner from "../Banner"
import Footer from '../Footer';


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
    sessionUser &&
    <div>
        <p id="home_title">Check out some of our available spots below!</p>
        <ul className='container-home'>
        {spots.map(spot => {
        return (
          spot.Images &&
          <li key={spot.id} className="user-listings__cards_home" >
            <SpotCard spot={spot} />
          </li>
        )
        })}
        </ul>
    </div>
  )
}

export default Home;