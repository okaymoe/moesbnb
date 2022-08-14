import { useState } from 'react';
import './SpotDetail.css';

const PhotoCard = ({ spot }) => {

    const [current, setCurrent] = useState(0);

    let length = Object.values(spot.images).length;

    return (
        <>
            <div id='img-container'>
                {Object.values(spot.images).map((img, i) => {
                    return (
                        <div className={i === current ? 'slide-active' : 'slide'} key={i}>
                                {i === current ?
                                        <img className='individual-spot-img' src={img.url} alt=''></img>
                                    : null}
                        </div>
                    )
                })}
                {length > 1 ?
                    <>
                        <button id='spot-card-leftarrow' onClick={
                            () => setCurrent(current === 0 ? length-1 : current - 1)
                        }><i className="fa-solid fa-chevron-left fa-sm"></i></button>
                        <button id='spot-card-rightarrow' onClick={
                            () => setCurrent(current === length-1 ? 0 : current + 1)
                        }><i className="fa-solid fa-chevron-right fa-sm"></i></button>
                    </>
                    : null
                }
            </div>
        </>
    )
}

export default PhotoCard;
