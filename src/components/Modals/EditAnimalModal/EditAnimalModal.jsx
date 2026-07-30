import React from 'react'
import styles from "./EditAnimalModal..module.css"

export default function EditAnimalModal({ animal, onClose }) {



  return (
    <div className={styles.editAnimalMainContainer} onClick={onClose}>

        <div className={styles.editAnimalContainer}onClick={(event) =>{ event.stopPropagation(); }}>

            <h2>Edit {animal.name}</h2>

            <p>Formuläret kommer här senare.</p>

            <button type="button" onClick={onClose} >
                Cancel
            </button>

        </div>

    </div>
  )
}
