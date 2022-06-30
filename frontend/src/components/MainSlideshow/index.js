import './MainSlideshow.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom'

const MainSlideshow = ({ images, id }) => {

  return (
    <div className='tryHere'>
      <Carousel
        className='main__carousel'
        infiniteLoop='true'
        showThumbs={false}
        showStatus={false}
        transitionTime={250}
        >
        {images.map(image =>
          <div className='image' key={id}>
            <Link to={`/spots/${id}`} className='card__link'>
              <figure className='card__image' style={{ backgroundImage: `url( ${image.url} )` }} />
            </Link>
          </div>
        )}
      </Carousel>
    </div>
  )
}

export default MainSlideshow
