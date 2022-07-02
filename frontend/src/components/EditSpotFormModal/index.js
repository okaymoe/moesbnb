import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from '../EditSpotForm';
import './EditSpotFormModal.css'


function EditSpotFormModal({spot, user}) {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      <button className='edit-listing-btn__modal btn' onClick={() => setShowEditModal(true)}>Edit Spot</button>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditSpotForm spot={spot} user={user} setTrigger={setShowEditModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal;