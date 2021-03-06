import { Link } from 'react-router-dom';
import './UnauthorizedUser.css';

const UnauthorizedUser = ({ type, userId }) => {

    return (
      <div className='redirect'>
        <div className='redirect__card form__card'>
        <p className='header-title'>Hey wait, these aren't your spots...</p>
        <ul>
          <li className='redirect__text'><Link to={`/users/${userId}/${type}s`}>Your {type}s</Link></li>
          <li className='redirect__text'><Link to='/'>Back to all spots</Link></li>
        </ul>
        </div>
      </div>
  )
}

export default UnauthorizedUser;