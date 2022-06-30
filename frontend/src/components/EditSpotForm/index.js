import './EditSpotForm.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { ValidationError } from '../../utils/validationError';
import { editSpot } from '../../store/spots'
// import EditImageForm from '../EditImageForm'
import EditImageFormModal from '../EditImageForm';

const EditSpotForm = ({ spot, user, setTrigger }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errorMessages, setErrorMessages] = useState({});
  const [address, updateAddress] = useState(spot.address);
  const [city, updateCity] = useState(spot.city);
  const [state, updateState] = useState(spot.state);
  const [country, updateCountry] = useState(spot.country);
  const [name, updateName] = useState(spot.name);
  const [price, updatePrice] = useState(spot.price);
  const [valid, setValid] = useState(false);

  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: user.id,
      address,
      city,
      state,
      country,
      name,
      price
    };

    let updatedSpot;

    try {
      updatedSpot = await dispatch(editSpot(payload, spot.id));
    } catch (error) {
      if (error instanceof ValidationError) setErrorMessages(error.errors)
      else setErrorMessages({ overall: error.toString().slice(7) });
    }

    if (updatedSpot) {
      setErrorMessages({});
      setValid(true)
      setShowModal(true);
    }
  }

  return (
    <>
      {!valid && (
        <div className='edit-listing-container container'>
          <h1 className='header-title'>Edit Your Spot</h1>
          <form className='edit-listing' onSubmit={handleSubmit}>
            <div className='edit-listing-form'>
              <span className='edit-listing__input-container'>
                <p>Address</p>
                <input
                  className='edit-listing__input'
                  type='text'
                  required
                  value={address}
                  onChange={(e) => updateAddress(e.target.value)}
                />
              </span>
              <span className='edit-listing__input-container'>
                <p>City</p>
                <input
                  className='edit-listing__input'
                  type='text'
                  required
                  value={city}
                  onChange={(e) => updateCity(e.target.value)}
                />
              </span>
              <span className='edit-listing__input-container'>
                <p>State</p>
                <input
                  className='edit-listing__input'
                  type='text'
                  required
                  value={state}
                  onChange={(e) => updateState(e.target.value)}
                />
              </span>
              <span className='edit-listing__input-container'>
                <p>Country</p>
                <input
                  className='edit-listing__input'
                  type='text'
                  placeholder='Country'
                  value={country}
                  onChange={(e) => updateCountry(e.target.value)}>
                </input>
              </span>
              <span className='edit-listing__input-container'>
                <p>Name</p>
                <input
                  className='edit-listing__input'
                  type='text'
                  required
                  value={name}
                  onChange={(e) => updateName(e.target.value)}
                />
              </span>
              <span className='edit-listing__input-container'>
                <p>Price</p>
                <input
                  className='edit-listing__input'
                  type='number'
                  required
                  value={price}
                  onChange={(e) => updatePrice(e.target.value)}
                />
              </span>

              <div className='edit-listing__btn-container'>
                <button className='edit-listing-form__btn btn' type="submit">Save and Edit Photos</button>
                <button className='edit-listing-form__btn btn'>Cancel</button>
              </div>
            </div>
          </form>
        </div>)}
      {showModal && (
        <EditImageFormModal spot={spot} setTrigger={setShowModal} setOuterTrigger={setShowModal} />
      )}
    </>
  )
};

export default EditSpotForm;