import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SpotCard = ({ spot }) => {

    const [current, setCurrent] = useState(0);

    let length = Object.values(spot.images).length;

    return (
        <div className='individual-spot'>
            <div className='img-container'>
                {Object.values(spot.images).reverse().map((img, i) => {
                    return (
                        <div className={i === current ? 'slide-active' : 'slide'} key={i}>
                                {i === current ?
                                    <NavLink to={`/spots/${spot.id}`} className='individual-spot-link'>
                                        <img className='individual-spot-img' src={img} alt=''></img>
                                    </NavLink>
                                    : null}
                            </div>
                    )
                })}
                {length > 1 ?
                    <>
                        <button className='spot-card-leftarrow' onClick={
                            () => setCurrent(current === 0 ? length-1 : current - 1)
                        }><i className="fa-solid fa-chevron-left fa-sm"></i></button>
                        <button className='spot-card-rightarrow' onClick={
                            () => setCurrent(current === length-1 ? 0 : current + 1)
                        }><i className="fa-solid fa-chevron-right fa-sm"></i></button>
                    </>
                    : null
                }
            </div>
            <NavLink to={`/spots/${spot.id}`} className='individual-spot-link'>
                <div>
                    <div className='spot-card-topinfo'>
                        <p className='spot-card-name'>{spot.name}</p>
                        <section>
                            <p className='spot-card-rating'>{spot.avgRating}</p>
                            <i className="fa-solid fa-star fa-sm front-page-star"></i>
                        </section>
                    </div>
                    <p className='spot-card-price'>
                        <span className='spot-card-cost'>${spot.price}</span> night</p>
                </div>
            </NavLink>
        </div>
    )
}

export default SpotCard;
