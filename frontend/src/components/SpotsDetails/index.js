import './SpotsDetails.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotsReviews from "../SpotsReviews/SpotsReviews";
import DetailPhotoDisplay from '../DetailPhotoDisplay';


const SpotsDetails = ({ user, spots }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  let spot = useSelector(state => state.spots[id])
  
  // const spotsArray = useSelector(state => state.spots)


  if (!spot) {
    return <p>Hmm..this isn't a spot!</p>}

  const { city, state, name, country, price } = spot;
  
  
   
  return (
    <div className='spot_display-header container'>
      <h2 className='booking__display-header-name header-title'>{name}</h2>
      <h4 className='booking__display-header-location header-subtitle'>{city}, {state}, {country}</h4>
      <h4 className='booking__display-header-location header-subtitle'>Cost per night: ${price}</h4>
      <DetailPhotoDisplay spot={spot}/>
      <SpotsReviews spot={spot}/>
    </div>
  )
}

export default SpotsDetails; 