import React, { useState } from 'react';

export default function ModalEditPost({ show, onClose, caption, onSave }) {
  const [editedCaption, setEditedCaption] = useState(caption);

  const handleSave = () => {
    onSave(editedCaption);
    onClose();
  };
 
  return (
    show && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-caption-input">
            <textarea
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
            />
          </div>
          <div className="modal-buttons">
            <button onClick={handleSave}>Guardar</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    )
  );
}