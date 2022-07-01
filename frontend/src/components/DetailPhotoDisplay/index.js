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
  )
}

export default DetailPhotoDisplay;
