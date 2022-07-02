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
