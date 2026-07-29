import {useParams} from 'react-router-dom'
import {doc, getDoc} from "firebase/firestore"
import {db} from "../../../firebase"
import { useEffect, useState } from "react";
import StatusBadge from "../../../components/StatusBadge/StatusBadge"
import animalImages from "../../../Data/animalImages";
import styles from "./AnimalDetails.module.css"


export default function AnimalDetails() {

  const {animalId} = useParams()

  const [animal, setAnimal] = useState(null)

  useEffect(() => {

    // Fetches a single animal from Firestore using its document ID.
    async function getAnimal() {

      try {

        // Builds the path to the selected animal.
        const animalDocumentReference = doc(db, "animals", animalId);

        // Loads the animal from the path above.
        const animalDocumentSnapshot = await getDoc(
          animalDocumentReference
        );

        // Checks if the document exists before reading its data.
        if (animalDocumentSnapshot.exists()) {

          // Creates an animal object and includes the document ID.
          const animalData = {
            id: animalDocumentSnapshot.id,
            ...animalDocumentSnapshot.data()
          };

          // Stores the animal data in state.
          setAnimal(animalData);

        } else {
          console.error("Animal not found.");
        }

      } catch (error) {
        console.error("Failed to load animal:", error);
      }

    }

    getAnimal();

  }, [animalId]);


  if(animal === null){
    return(
      <p>Loading animal..</p>
    )
  }

  const animalImage = animalImages[animal.image];


  return (
    <div className={styles.animalDetailsMainContainer}>

      <header className={styles.animalDetailsHeader}>

        <div  className={styles.animalDetailsHeaderText}>
          <h1>{animal.name}</h1>
          <StatusBadge status={animal.status}/>
        </div>
       
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>     

      </header>

      <section className={styles.animalDetailsData}>
        <div>
          <img src={animalImage} alt={animal.name} />
        </div>
        <div className={styles.animalDetailsOverview}>
          <h3>Overview</h3>

          <div className={styles.animalDetailsDb}>
            <p>Status: <StatusBadge status={animal.status}/> </p>
            <p>Breed: {animal.breed}</p>
            <p>Age: {animal.age} years</p>
            <p>Gender: {animal.gender}</p>
            <p>Weight: {animal.weight} kg</p>
            <p>Date added: {animal.dateAdded}</p>
            <p>Neutered: {animal.neutered ? "Yes" : "No"}</p>
            <p>Vaccinated: {animal.vaccinated ? "Yes" : "No"}</p>
          </div>
       
        </div>
      </section>

      <section className={styles.animalDetailsDbMedecin}>
        <div>
          {animal.description} <br /> <br />
          {animal.medicalNotes} <br /> <br />
          {animal.notes} <br /> <br />
          {animal.history} <br /> <br />
        </div>
      </section>

    </div>
  )
}
