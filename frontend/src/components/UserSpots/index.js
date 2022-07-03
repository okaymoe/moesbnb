import './UserSpots.css'
import { useParams, NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSpots } from '../../store/spots'
import SpotCard from '../SpotCard';
import EditSpotFormModal from '../EditSpotFormModal';
import DeleteSpotForm from '../DeleteSpotForm';
import UnauthorizedUser from '../UnauthorizedUser';
import { Modal } from '../../context/Modal';


const UserSpots = ({ spots, user, setTrigger }) => {
  const dispatch = useDispatch()
  const [deleteForm, setDeleteForm] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [deletedSpot, setDeletedSpot] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { id } = useParams();

  // const mySpots = useSelector(state => Object.values(state.spots).filter(spot => {
  //   return spot.userId === user.id;
  // }));

  // let imageState = useSelector((state) => state.images);
  // let imageStateArray = Object.values(imageState || {})

  // if (mySpots.length && imageStateArray.length) {
  //   mySpots[mySpots.length-1].Images = imageStateArray
  // }

  const spotsObj = useSelector(state => state.spots)
  const mySpots = Object.values(spotsObj).filter(spot => spot.userId === user.id)


  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch, showDeleteModal]);

  useEffect(() => {
    if (selectedSpot)
    setDeleteForm(false)
  }, [selectedSpot])

  useEffect(() => {
    if (deletedSpot)
      setDeleteForm(true)
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
        <h2 className='nospots header-title'>Spots</h2>
        <p className='nospotstxt'>You currently don't have any spots, <NavLink exact to ="/spots">care to make one?</NavLink></p>
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
          
            // spot.Images.length &&
            <li className="user-listings__cards" key={spot.id} >
              <SpotCard spot={spot}
                isSelected={selectedSpot && spot.id === selectedSpot.id}
              />
              <div className='user-listing__btn-container'>
                <button
                  onClick={() => handleDeleteClick(spot)}
                  className='btn user-listing__btn'
                >Remove Spot</button>
                <EditSpotFormModal spot={spot} user={user}/>
                {showDeleteModal && (
                  <Modal onClose={() => setShowDeleteModal(false)}>
                    <DeleteSpotForm spot={deletedSpot} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} user={user} />
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