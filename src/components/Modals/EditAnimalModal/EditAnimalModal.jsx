import styles from "./EditAnimalModal.module.css"
import animalImages from "../../../Data/animalImages";
import appLogo from "../../../assets/appLogo.png"
import sideBarPawLogo from "../../../assets/sideBarPawLogo.png"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";

export default function EditAnimalModal({ animal, onClose, setAnimal }) {

    const [selectedImage, setSelectedImage] = useState(animal.image);
    const [showAllImages, setShowAllImages] = useState(false);
    
    const [formData, setFormData] = useState({

        name: animal.name,
        breed: animal.breed,
        age: animal.age,
        gender: animal.gender,
        status: animal.status,
        weight: animal.weight,
        color: animal.color,
        description: animal.description,
        medicalNotes: animal.medicalNotes,
        notes: animal.notes,
        history: animal.history,
        dateAdded: animal.dateAdded,
        vaccinated: animal.vaccinated,
        neutered: animal.neutered

    });

    const allAnimalImages = Object.entries(animalImages);

    let visibleAnimalImages = allAnimalImages;

    if (showAllImages === false) {
        visibleAnimalImages = allAnimalImages.slice(0, 5);
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const updatedAnimal = {
            ...formData,
            age: Number(formData.age),
            weight: Number(formData.weight),
            image: selectedImage
        };

        try {
            const animalDocumentReference = doc( db,"animals",animal.id);

            await updateDoc( animalDocumentReference, updatedAnimal );

            setAnimal({ id: animal.id,  ...updatedAnimal });

            onClose();

        } catch (error) {
            console.error("Failed to update animal:", error);
        }

    }



  return (
    <div className={styles.editAnimalMainContainer} onClick={onClose}>

        <div className={styles.editAnimalContainer} onClick={(event) =>{ event.stopPropagation(); }}>

            <div className={styles.editAnimalHeader}>
                <img src={sideBarPawLogo} alt="Paw logo" width={60}/>
                <p> Fill in the details below to update a new animal</p>
            </div>

            <div className={styles.editAnimalContainerLogo}>
                <img src={appLogo} alt="Logo" width={270} />              
            </div>

            <h1>Edit: {animal.name}</h1>
            <form className={styles.editAnimalForm} onSubmit={handleSubmit}>

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(event) => {
                    setFormData({
                        ...formData,
                        name: event.target.value
                    });
                    }}
                    required
                />

                <label htmlFor="breed">Breed</label>
                <input
                    type="text"
                    id="breed"
                    value={formData.breed}
                    onChange={(event) => {
                    setFormData({
                        ...formData,
                        breed: event.target.value
                    });
                    }}
                    required
                />

                <label htmlFor="age">Age</label>
                <input
                    type="number"
                    id="age"
                    value={formData.age}
                    onChange={(event) => {
                    setFormData({
                        ...formData,
                        age: event.target.value
                    });
                    }}
                    required
                />

                <label htmlFor="gender">Gender</label>
                <input
                    type="text"
                    id="gender"
                    value={formData.gender}
                    onChange={(event) => {
                    setFormData({
                        ...formData,
                        gender: event.target.value
                    });
                    }}
                    required
                />

                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={formData.status}
                    onChange={(event) => {
                    setFormData({
                        ...formData,
                        status: event.target.value
                    });
                    }}
                    required
                >
                    <option value="">Select status</option>
                    <option value="Available">Available</option>
                    <option value="Adopted">Adopted</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Medical Hold">Medical Hold</option>
                    <option value="In Foster Care">In Foster Care</option>
                </select>

                <label htmlFor="weight">Weight (kg)</label>
                <input
                    type="number"
                    id="weight"
                    value={formData.weight}
                    onChange={(event) => {
                    setFormData({
                        ...formData,
                        weight: event.target.value
                    });
                    }}
                />

                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    id="color"
                    value={formData.color}
                    onChange={(event) => {
                    setFormData({
                        ...formData,
                        color: event.target.value
                    });
                    }}
                />

                <label htmlFor="description">Overview</label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(event) => {
                        setFormData({
                        ...formData,
                        description: event.target.value
                        });
                    }}
                />

                <label htmlFor="medicalNotes">Medical</label>
                <textarea
                    id="medicalNotes"
                    value={formData.medicalNotes}
                    onChange={(event) => {
                        setFormData({
                        ...formData,
                        medicalNotes: event.target.value
                        });
                    }}
                />

                <label htmlFor="notes">Notes</label>
                <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(event) => {
                        setFormData({
                        ...formData,
                        notes: event.target.value
                        });
                    }}
                />

                <label htmlFor="history">History</label>
                <textarea
                    id="history"
                    value={formData.history}
                    onChange={(event) => {
                        setFormData({
                        ...formData,
                        history: event.target.value
                        });
                    }}
                />

                <label htmlFor="dateAdded">Date added</label>
                <input
                    type="date"
                    id="dateAdded"
                    value={formData.dateAdded}
                    onChange={(event) => {
                        setFormData({
                        ...formData,
                        dateAdded: event.target.value
                        });
                    }}
                />

                <div className={styles.editAnimalFormCheckbox}>

                    <div className={styles.checkboxGroup}>

                        <label htmlFor="vaccinated">Vaccinated</label>
                        <input
                            type="checkbox"
                            id="vaccinated"
                            checked={formData.vaccinated}
                            onChange={(event) => {
                                setFormData({
                                ...formData,
                                vaccinated: event.target.checked
                                });
                            }}
                        />

                    </div>

                    <div className={styles.checkboxGroup}>

                        <label htmlFor="neutered">Neutered</label>
                        <input
                            type="checkbox"
                            id="neutered"
                            checked={formData.neutered}
                            onChange={(event) => {
                                setFormData({
                                ...formData,
                                neutered: event.target.checked
                                });
                            }}
                        />

                    </div>


                </div>

                <label>Select image</label>
                <div className={styles.editAnimalModalImg}>

                    {visibleAnimalImages.map((animalImage) => {

                        const imageId = animalImage[0];
                        const imageSource = animalImage[1];

                        return (
                            <button
                                key={imageId}
                                type="button"
                                className={`${styles.imageButton} ${
                                selectedImage === imageId ? styles.selectedImage : ""}`}
                                onClick={() => { setSelectedImage(imageId); }}
                            >
                                <img
                                    src={imageSource}
                                    alt={imageId}
                                    loading="lazy"
                                />
                            </button>
                        );
                    })}

                    {allAnimalImages.length > 5 && (
                        <button
                            type="button"
                            className={`${styles.imageButton} ${styles.imageGalleryToggleButton}`}

                            onClick={() => {
                                setShowAllImages(!showAllImages);
                            }}

                            >
                            <div>
                                <span>{showAllImages ? "−" : "+"}</span>
                                <small> {showAllImages ? "Show less" : "Show more"} </small>
                            </div>
                        </button>
                    )}

                </div>

                <div className={styles.editAnimalContainerButtons}>

                    <button
                        type="button"
                        className={styles.editAnimalContainerCancelButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className={styles.editAnimalContainerSaveButton}
                    >
                        Save changes
                    </button>

                </div>

            </form>

        </div>

    </div>
  )
}
