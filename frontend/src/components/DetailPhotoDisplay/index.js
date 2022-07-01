import { useSelector, useDispatch } from 'react-redux';
import './DetailPhotoDisplay.css'
import { useEffect } from 'react';
import { getImages } from '../../store/images';


const DetailPhotoDisplay = ({spot}) => {
  const images = useSelector(state => state.images)
  const dispatch = useDispatch()

//object.values on images above -- imagesArray -> map below over imagesArray

useEffect(() => {
  dispatch(getImages(spot.id));
}, [dispatch]);

  return (
    <div className="listing-photos container">
      {images.map(image => (
      <div className='listing-photos__main'>
        <figure
          className='listing-photos__main-image card__image'
          style={{ backgroundImage: `url( ${image.url} )` }} />
        </div>
    ))}
    </div>
    // <div className='listing-photos container'>
    //   <div className='listing-photos__main'>
    //     <figure
    //       className='listing-photos__main-image card__image'
    //       style={{ backgroundImage: `url( ${firstImage} )` }} />
    //   </div>
    //   <ul className='listing-photos__sub'>
    //     <li className='listing__photos-sub' ><figure
    //       className='listing-photos__image listing-photos__photo1'
    //       style={{ backgroundImage: `url( ${display[0].url} )` }} /></li>
    //     <li className='listing__photos-sub'> 
    //       <figure
    //         className='listing-photos__image listing-photos__photo2'
    //         style={{ backgroundImage: `url( ${display[1].url} )` }} />
    //     </li>
    //   </ul>
    // </div>
  )
}

export default DetailPhotoDisplay;
