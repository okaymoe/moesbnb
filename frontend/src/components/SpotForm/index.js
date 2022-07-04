import './SpotForm.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ValidationError } from '../../utils/validationError';
import { createNewSpot } from '../../store/spots'
import ImageForm from '../ImageForm/index'


const SpotForm = () => {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [errorMessages, setErrorMessages] = useState({});
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [valid, setValid] = useState(false)
  const [errorz, setErrorz] = useState([])

  const [id, setId] = useState('');

  useEffect(()=> {
    const errorss = []
    if (address.length < 2 || address.length > 25) errorss.push("Address must be between 2 - 25 characters")
    if (city.length < 2 || city.length > 25) errorss.push("City must be between 2 - 25 characters")
    if (state.length < 2 || state.length > 25) errorss.push("State must be between 2 - 25 characters")
    if (country.length < 2 || country.length > 25) errorss.push("Country must be between 2 - 25 characters")
    if (name.length < 2 || name.length > 25) errorss.push("Name must be between 2 - 25 characters")
    if (price < 0) errorss.push("Price must be free or cost more than $0.00.")
    if (price.length > 5) errorss.push("Your spot can't cost that much!")

    setErrorz(errorss)

  }, [name, address, city, state, country, price])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      address,
      city,
      state,
      country,
      name,
      price,
    };

    let newSpot;

    try {
      newSpot = await dispatch(createNewSpot(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrorMessages(error.errors)
      else setErrorMessages({ overall: error.toString() });
    }

    if (newSpot) {
      setErrorMessages({});
      setValid(true)
      setId(newSpot.id)
      // reset()
    }
  }
  const reset = () => {
    setErrorMessages({})
    setAddress('');
    setCity('');
    setState('');
    setCountry('');
    setName('');
    setPrice('');
  }

  return (
    <div className='listing-form__page'>
      <div className='listing-form__header container'>
      </div>
      {!valid ?
        (<div className='listing-container container'>

          <h2 className="requirements">Requirements</h2>
          <ul className="spoterrors">
          {errorz.map((error) => (
          <li key={error}>{error}</li>
        ))}
          </ul>
          <h1>HOST YOUR SPOT</h1>
          <form className='create-listing' onSubmit={handleSubmit}>
            <div className='listing-form'>
              <input
                className='listing-form__input'
                type='text'
                minLength='2'
                maxLength='25'
                placeholder='Address'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className='listing-form__input'
                type='text'
                placeholder='City'
                minLength='2'
                maxLength='25'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className='listing-form__input'
                type='text'
                placeholder='State/Province'
                minLength='2'
                maxLength='25'
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <input 
              className='listing-form__input' 
              type='text' 
              placeholder='Country' 
              required
              minLength="2"
              maxLength="25"
              onChange={(e) => setCountry(e.target.value)}
              />
              <input
                className='listing-form__input'
                type='text'
                placeholder='Name'
                minLength='2'
                maxLength='25'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='number'
                className='listing-form__input'
                placeholder='Nightly Rate'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <button className='btn listing-form__btn' disabled={!!errorz.length} type="submit">Upload Images</button>
            </div>
          </form>
        </div>) :
        <ImageForm spotId={id} user={sessionUser} />}
    </div>
  )
}

export default SpotForm;