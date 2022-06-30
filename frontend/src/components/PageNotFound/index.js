import './PageNotFound.css'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='redirect'>
      <div className='redirect__card form__card'>
        <p className='header-title'>Looks like we don't have exactly what you're looking for...</p>
        <ul>
          <li className='redirect__text'><Link to={`/`}>But we might have something else</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default PageNotFound;