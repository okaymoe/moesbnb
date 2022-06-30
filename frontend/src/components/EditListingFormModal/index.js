import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from '../EditSpotForm';
import './EditListingFormModal.css'


function EditListingFormModal({showEditModal, setShowEditModal}) {

  return (
    <>
      <button className='edit-listing-btn__modal btn' onClick={() => setShowEditModal(true)}>Log In</button>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditSpotForm setShowEditModal={setShowEditModal} showEditModal={showEditModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditListingFormModal;