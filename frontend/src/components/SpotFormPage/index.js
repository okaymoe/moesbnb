import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { create } from "../../store/spot";

import './SpotForm.css';

function SpotFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    let userId;
    if (sessionUser) userId = sessionUser.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(10);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const [imgOne, setImgOne] = useState("");
    const [imgTwo, setImgTwo] = useState("");
    const [imgThree, setImgThree] = useState("");
    const [imgFour, setImgFour] = useState("");

    const [images, setImages] = useState([imgOne, imgTwo, imgThree, imgFour]);
    const [errors, setErrors] = useState([]);
    const [submitState, setSubmitState] = useState(false);

    if (!sessionUser) return <Redirect to="/login" />;

    const handleSubmit = async (e) => {
      setSubmitState(true);
      e.preventDefault();
      setErrors([]);
      let dispatchData;
      dispatchData = await dispatch(create({ userId, name, price, address, city, state, country, images }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        setSubmitState(false);
      })
      .then(res => {
        if (res) history.push(`/spots/${res.spot.id}`)
      })
      return dispatchData;
    };

    return (
      <form onSubmit={handleSubmit} id='spot-edit-form'>
        <div className='error-container'>
          {errors.length ? <p className='error-message'>The following errors occured:</p> : null}
          <ul>
            {errors.map((error, idx) => <li className='form-error' key={idx}>{error}</li>)}
          </ul>
        </div>
        <label className='edit-form-label'>
          Name
          <input
            className='edit-form-input'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          Cost Per Night
          <input
            className='edit-form-input'
            type="number"
            min="10"
            max="99999"
            step='1'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          Address
          <input
            className='edit-form-input'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          City
          <input
            className='edit-form-input'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          State
          <input
            className='edit-form-input'
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          Country
          <input
            className='edit-form-input'
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          Image Url
          <div id='edit-spot-images'>
            <input
              className='edit-form-input'
              type="text"
              value={imgOne}
              onChange={(e) => setImgOne(e.target.value)}
              placeholder=' (Required)'
            />
            <input
              className='edit-form-input'
              type="text"
              value={imgTwo}
              onChange={(e) => setImgTwo(e.target.value)}
              placeholder=' (Optional)'
            />
            <input
              className='edit-form-input'
              type="text"
              value={imgThree}
              onChange={(e) => setImgThree(e.target.value)}
              placeholder=' (Optional)'
            />
            <input
              className='edit-form-input'
              type="text"
              value={imgFour}
              onChange={(e) => setImgFour(e.target.value)}
              placeholder=' (Optional)'
            />
          </div>
        </label>
        <div id='spot-post-buttons'>
          <button
            className='edit-post-button'
            id='post-spot-button'
            type="submit"
            onClick={() => setImages([imgOne, imgTwo, imgThree, imgFour])}
            disabled={submitState}
            >Post</button>
        </div>
      </form>
    );
}

export default SpotFormPage;
