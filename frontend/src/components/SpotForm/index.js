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

  const [id, setId] = useState('');

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
          <form className='create-listing' onSubmit={handleSubmit}>
            <div className='listing-form'>
              <input
                className='listing-form__input'
                type='text'
                minLength='3'
                maxLength='50'
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
                maxLength='50'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className='listing-form__input'
                type='text'
                placeholder='State/Province'
                minLength='2'
                maxLength='50'
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <input className='listing-form__input' type='text' placeholder='Country' onChange={(e) => setCountry(e.target.value)}
              ></input>
              <input
                className='listing-form__input'
                type='text'
                placeholder='Name'
                minLength='3'
                maxLength='150'
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
              <button className='btn listing-form__btn' type="submit">Upload Images</button>
            </div>
          </form>
        </div>) :
        <ImageForm spotId={id} user={sessionUser} />}
    </div>
  )
}

export default SpotForm;