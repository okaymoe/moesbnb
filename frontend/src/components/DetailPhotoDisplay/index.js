import './DetailPhotoDisplay.css'

const DetailPhotoDisplay = ({ spot }) => {
  const { Images } = spot

  const firstImage = Images[0].url;
  const display = []

  for (let i = 1; i < 5; i++) {
    display.push(Images[i]);
  }


  return (
       <div className="listing-photos container">
    {Images.map(image => (
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
