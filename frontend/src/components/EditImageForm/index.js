import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditImageForm from './EditImageForm'

export default function EditImageFormModal({ spot }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Modal onClose={() => setShowModal(false)}>
      <EditImageForm spot={spot} />
    </Modal>
  )

}
