import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { LuSave } from "react-icons/lu";
import animalImages from "../../../Data/animalImages";
import styles from "./AddAnimalModal.module.css";
import appLogo from "../../../assets/appLogo.png"
import sideBarPawLogo from "../../../assets/sideBarPawLogo.png"

export default function AddAnimalModal({ onClose, setAnimals }) {

  // Stores the currently selected dog image.
  const [selectedImage, setSelectedImage] = useState("");
  const [showAllImages, setShowAllImages] = useState(false);

  // Stores all form values before submitting the new animal.
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    status: "",
    weight: "",
    color: "",
    description: "",
    medicalNotes: "",
    notes: "",
    history: "",
    dateAdded: "",
    vaccinated: false,
    neutered: false
  });

  // Converts the object into an array so it can be mapped.
  const allAnimalImages = Object.entries(animalImages);

  let visibleAnimalImages = allAnimalImages;

  if (showAllImages === false) {
    visibleAnimalImages = allAnimalImages.slice(0, 5);
  }

  // Handles the form submission and creates a new animal in Firestore.
  async function handleSubmit(event) {

    event.preventDefault();

    if (selectedImage === "") {
      alert("Please select an image.");
      return;
    }

    // Creates the final animal object and converts numeric fields.
    const newAnimal = {
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
      image: selectedImage
    };

    try {

      const addedAnimal = await addDoc(
        collection(db, "animals"),
        newAnimal
      );

      // Updates the local state so the table refreshes immediately.
      setAnimals((currentAnimals) => {
        return [
          ...currentAnimals,
          {
            id: addedAnimal.id,
            ...newAnimal
          }
        ];
      });

      onClose();

    } catch (error) {
      console.error("Failed to add animal:", error);
    }

  }

  return (

    <div className={styles.addAnimalMainContainer} onClick={onClose}>
      

      <div className={styles.addAnimalContainer} onClick={(event) => { event.stopPropagation(); }}>

        <div className={styles.addAnimalContainerHeader}>
          <img src={sideBarPawLogo} alt="Logo paw" width={50}/>
          <p>
            Fill in the details below to create a new animal
          </p>
        </div>
        
        <div className={styles.addAnimalContainerLogo}>
          <img src={appLogo} alt="Logo" width={270} />         
        </div>
      

        {/* Form inputs */}
        <form className={styles.addAnimalForm} onSubmit={handleSubmit}>

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

          <label htmlFor="date">Date added</label>
          <input
            type="date"
            id="date"
            value={formData.dateAdded}

            onChange={(event) => {
              setFormData({
                ...formData,
                dateAdded: event.target.value
              });
            }}

          />

          <div className={styles.addAnimalFormCheckbox}>

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

          <div className={styles.addAnimalModalImg}>

            {visibleAnimalImages.map((animalImage) => {

              const imageId = animalImage[0];
              const imageSource = animalImage[1];

              return (
                <button                 
                  key={imageId}
                  type="button"
                  className={`${styles.imageButton} ${selectedImage === imageId ? styles.selectedImage   : "" }`}

                  onClick={() => {
                    setSelectedImage(imageId);
                  }}

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

              <button type="button" className={`${styles.imageButton} ${styles.imageGalleryToggleButton}`} onClick={() => { setShowAllImages(!showAllImages);}}>

                <div>

                  <span>{showAllImages ? "−" : "+"}</span>

                  <small>
                    {showAllImages ? "Show less" : "Show more"}
                  </small>

                </div>

              </button>

            )}

          </div>

          <div className={styles.addAnimalContainerButtonsCancelSubmit}>

            <button className={styles.addAnimalContainerCancelButton}  type="button"  onClick={onClose} > Cancel </button>

            <button className={styles.addAnimalContainerSubmitButton} type="submit"><LuSave /> Save animal</button>

          </div>

          

        </form>

      </div>

    </div>
  );
}