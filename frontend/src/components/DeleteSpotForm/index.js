import './DeleteSpotForm.css';
import { useDispatch, useSelector } from 'react-redux';
import spotsReducer, { deleteSpot, getSpots } from '../../store/spots'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';

const DeleteSpotForm = ({ spot, visible, showDeleteModal, setShowDeleteModal, user }) => {


  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();


  // useEffect(() => {
  //   dispatch(getSpots())
  // }, [deleted]);

  if (!showDeleteModal) return null;
  if (!spot) {
    return null
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSpot(id))
    } catch (error) {
      //
    }
    setDeleted(true);
    setShowDeleteModal(false);
    // history.push(`/users/${user.id}/spots`)
  };

  return (
    showDeleteModal &&
    <div className='delete-listing__form'>
      <h1 className='delete-listing__title'>Are you sure you want to remove {spot.name} from your spots?</h1>
      <p>——This can't be undone——</p>
      <button className='delete-listing__btn btn' onClick={() => setShowDeleteModal(false)}>Nevermind...</button>
      <button className='delete-listing__btn btn' onClick={() => handleDelete(spot.id)}>Yes, remove it!</button>
    </div>
  )
}

export default DeleteSpotForm;