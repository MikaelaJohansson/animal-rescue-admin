import {useParams} from 'react-router-dom'
import {doc, getDoc} from "firebase/firestore"
import {db} from "../../../firebase"
import { useEffect, useState } from "react";


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


  return (
    <div>
      <p>{animal.name}</p>

    </div>
  )
}
