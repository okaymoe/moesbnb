import { useSelector, useDispatch } from 'react-redux';
import './DetailPhotoDisplay.css'
import { useEffect } from 'react';
import { getAllImages } from '../../store/images';


const DetailPhotoDisplay = ({spot}) => {
  const imagesObj = useSelector(state => state.images)
  const dispatch = useDispatch()

  const images = Object.values(imagesObj || {})
//object.values on images above -- imagesArray -> map below over imagesArray

useEffect(() => {
  dispatch(getAllImages(spot.id));
}, [dispatch]);

return ( (images.length && images[0].spotId === spot.id) ?
    <div className="listing-photos container">
      {images.map(image => (
      <div key={image.id} className='listing-photos__main'>
        <figure
          className='listing-photos__main-image card__image'
          style={{ backgroundImage: `url( ${image.url} )` }} />
      </div>
    ))}
    </div>
    : null
  )
}

export default DetailPhotoDisplay;
