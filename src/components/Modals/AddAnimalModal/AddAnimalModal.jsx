import { useState } from "react";
import {addDoc, collection} from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./AddAnimalModal.module.css"
import selectableAnimalImages from "../../../Data/selectableAnimalImages"


export default function AddAnimalModal({ onClose, setAnimals }) {

  // Stores the currently selected dog image.
  const [selectedImage, setSelectedImage] = useState("")

  // Stores all form values before submitting the new animal.
  const [formData, setFormData] = useState({

    name: "",
    breed: "",
    age: "",
    gender: "",
    status: "",
    weight: "",
    color: "",
    dateAdded: "",
    vaccinated: false,
    neutered: false

  })

  // Handles the form submission and creates a new animal in Firestore.
  async function handleSubmit(event){

    event.preventDefault();

    if(selectedImage === ""){
      alert("Please select an image.")
      return;
    }

    // Creates the final animal object and converts numeric fields.
    const newAnimal = {
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
      image: selectedImage
    }

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

      <div className={styles.addAnimalContainer} onClick={(event) => event.stopPropagation()}>

        <h1>Add animal</h1>

        <p>
          Fill in the details below to create anew animal
        </p>

        {/* form inputs */}
        <form className={styles.addAnimalForm} onSubmit={handleSubmit}>

          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={formData.name} onChange={(event)=>{ setFormData({...formData, name: event.target.value})}}  required/>

          <label htmlFor="breed">Breed</label>
          <input type="text" id="breed" value={formData.breed} onChange={(event)=>{setFormData({...formData, breed: event.target.value})}} required/>

          <label htmlFor="age">Age</label>
          <input type="number" id="age" value={formData.age} onChange={(event) => {setFormData({...formData, age: event.target.value})}} required />

          <label htmlFor="gender">Gender</label>
          <input type="text" id="gender" value={formData.gender}  onChange={(event) => {setFormData({...formData, gender: event.target.value})}} required />

   
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
          <input type="number" id="weight" value={formData.weight}  onChange={(event) => {setFormData({...formData, weight: event.target.value})}} />

          <label htmlFor="color">Color</label>
          <input type="text" id="color" value={formData.color}  onChange={(event) => {setFormData({...formData, color: event.target.value})}} />

          <label htmlFor="date">Date added</label>
          <input type="date" id="date" value={formData.dateAdded}  onChange={(event) => {setFormData({...formData, dateAdded: event.target.value})}}/>
            
          <div className={styles.addAnimalFormCheckbox}>
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
            &nbsp;&nbsp;&nbsp;
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

          {/* dog img select */}
          <div className={styles.addAnimalModalImg}>

            {selectableAnimalImages.map((animalImage)=>{

              return(

                <button
                  key={animalImage.id}
                  type="button"
                  className={`${styles.imageButton} ${selectedImage === animalImage.id  ? styles.selectedImage : ""}`}
                  onClick={()=>setSelectedImage(animalImage.id)}
                >
                  <img src={animalImage.src}  alt={animalImage.id} />

                </button>

              )

            })}

          </div>
        
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" >Save animal</button>

        </form>        

      </div>

    </div>
  );
}
