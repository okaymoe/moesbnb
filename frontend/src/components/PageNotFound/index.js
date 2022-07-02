import './PageNotFound.css'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='redirect'>
      <div className='redirect__card form__card'>
        <ul>
        <img id="brokenhome" src="https://cdn3.iconfinder.com/data/icons/love-and-romance-12/24/_broken_home-512.png" alt="notfound"/>  
        <p className='header-title'>Sorry, we can't find what you're looking for...</p>
          <li className='redirect__text'><Link to={`/`}>Home Sweet Home</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default PageNotFound;