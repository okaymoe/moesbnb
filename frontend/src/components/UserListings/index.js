import './UserSpots.css'
import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSpots } from '../../store/spots'
import SpotCard from '../SpotCard';
import EditListingFormModal from '../EditListingFormModal';
import DeleteListingForm from '../DeleteListingForm';
import UnauthorizedUser from '../UnauthorizedUser';
import { Modal } from '../../context/Modal';


const UserSpots = ({ spots, user, setTrigger }) => {
  const dispatch = useDispatch()
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [deletedSpot, setDeletedSpot] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { id } = useParams();

  const mySpots = useSelector(state => Object.values(state.spots).filter(spot => {
    return spot.userId === user.id;
  }));
  // const mySpots = useSelector(state => console.log(Object.values(state.spots)))

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch, showDeleteModal]);

  useEffect(() => {
    if (selectedSpot)
      setEditForm(true)
    setDeleteForm(false)
  }, [selectedSpot])

  useEffect(() => {
    if (deletedSpot)
      setDeleteForm(true)
    setEditForm(false)
  }, [deletedSpot])

  useEffect(() => {
    if (!deleteForm) {
      setDeletedSpot(null);
    }
  }, [deleteForm])

  if (user.id !== +id) {
    return (
      <UnauthorizedUser type={'spot'} userId={user.id} />
    )
  }

  if (!mySpots.length) {
    return (
      <>
        <h2 className='notrips header-title'>Listings</h2>
        <p>No listings..make one</p>
      </>
    )
  }

  const handleDeleteClick = (spot) => {
    setDeletedSpot(spot);
    setShowDeleteModal(true);
  }

  return (
    <div className='container'>
      <h1 className='header-title'>Your Spots</h1>
      <ul className='user-listings__grid'>
        {mySpots.map(spot => (
          
            spot.Images.length &&
            <li className="user-listings__cards" key={spot.id} >
              <SpotCard spot={spot}
                isSelected={selectedSpot && spot.id === selectedSpot.id}
              />
              <div className='user-listing__btn-container'>
                <button
                  onClick={() => handleDeleteClick(spot)}
                  className='btn user-listing__btn'
                >Remove Spot</button>
                <EditListingFormModal spot={spot} user={user}/>
                {showDeleteModal && (
                  <Modal onClose={() => setShowDeleteModal(false)}>
                    <DeleteListingForm
                      spot={deletedSpot}
                      showDeleteModal={showDeleteModal}
                      setShowDeleteModal={setShowDeleteModal}
                      user={user} />
                  </Modal>
                )}
              </div>
            </li>
          
        ))}
      </ul>
    </div>
  );
}
export default UserSpots;