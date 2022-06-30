import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditImageForm from './EditImageForm'

export default function EditImageFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditImageForm />
        </Modal>
      )}
    </>
  );
}

