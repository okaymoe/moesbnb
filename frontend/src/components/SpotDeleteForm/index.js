import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSpotThunk } from '../../store/spot';

import './SpotDeleteForm.css';

const SpotDeleteForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spot.data);
    const images = useSelector(state => state.spot.images);
    const reviews = useSelector(state => state.spot.reviews);

    const [deleteInput, setDeleteInput] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let data;
        await dispatch(deleteSpotThunk({spot, images, reviews, deleteInput}))
            .catch(async (res) => {
                data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        if (!data) history.push('/');
    }

    return (
        <div id='spot-delete-form'>
        <p>Type the name if this spot and press 'Delete' to confirm this action.</p>
        {errors.length > 0 ?
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> : null}
        <form onSubmit={handleSubmit}>
            <input
                className='edit-form-input'
                id='delete-form-input'
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder="(Type name here)"
            />
            <button
                className='edit-post-button'
                type='submit'
                id='delete-form-button'
                >Delete</button>
        </form>
        </div>
    );
}

export default SpotDeleteForm;
