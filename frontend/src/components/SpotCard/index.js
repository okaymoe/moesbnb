import './SpotCard.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MainSlideshow from '../MainSlideshow';


const SpotCard = ({ spot }) => {
  const { id, city, state, country, name, Images, price } = spot;


  return (
    <div className='card card__carousel'>
      <MainSlideshow images={Images} id={id} />
      {/* <figure className='card__image' style={{ backgroundImage: `url( ${Images[0].url} )` }} /> */}
      <Link to={`/spots/${id}`} className='card__link'>
        <div className='card__location'>
        <p className='card__text card__name'>{name}</p>
        </div>
          <p className='card__text card__location'>{city}, {state}, {country}</p>
        <div className='card__value-container'>
          <p className='card__text card__value'>${price}</p>
          <p className='card__text card__price'>/ night</p>
        </div>
      </Link>
    </div>
  )
}

export default SpotCard;