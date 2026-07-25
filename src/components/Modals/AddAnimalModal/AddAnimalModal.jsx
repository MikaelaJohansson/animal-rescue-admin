import React from 'react'

export default function AddAnimalModal({ onClose }) {
  return (
    <div>
      <h2>Add animal</h2>

      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
