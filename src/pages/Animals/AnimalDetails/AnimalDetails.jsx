import {useParams, useNavigate, Link} from 'react-router-dom'
import {deleteDoc, doc, getDoc} from "firebase/firestore"
import {db} from "../../../firebase"
import { useEffect, useState } from "react";
import {LuTrash2, LuPencilLine,LuArrowLeft, } from "react-icons/lu";
import StatusBadge from "../../../components/StatusBadge/StatusBadge"
import animalImages from "../../../Data/animalImages";
import styles from "./AnimalDetails.module.css"
import EditAnimalModal from "../../../components/Modals/EditAnimalModal/EditAnimalModal";


export default function AnimalDetails() {

  const {animalId} = useParams()

  const [animal, setAnimal] = useState(null)
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const navigate = useNavigate()

  // open closes modal
  function openEditModal(){
    setIsEditModalOpen(true)
  }
  function closeEditModal(){
    setIsEditModalOpen(false)
  }

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

          const savedAnimalStatuses = JSON.parse(sessionStorage.getItem("animalStatuses")) || {}

          const savedStatus = savedAnimalStatuses[animalId]

          const animalData = {
            id: animalDocumentSnapshot.id,
            ...animalDocumentSnapshot.data(),
            status: savedStatus || animalDocumentSnapshot.data().status
          }

          setAnimal(animalData)

        } else {
          console.error("Animal not found.");
        }

      } catch (error) {
        console.error("Failed to load animal:", error);
      }

    }

    getAnimal();

  }, [animalId]);

  // delete animal
  async function deleteAnimal(){

    if (animal.isDemoProtected) {
      return;
    }

    const userConfirmedDelete = window.confirm(`Are you sure you want to delete ${animal.name}?`)

    if(userConfirmedDelete === false){
      return;
    }

    try{

      const animalDocumentReference = doc(db, "animals", animalId)

      await deleteDoc(animalDocumentReference)

      navigate("/animals")

    }catch(error){
      console.error("Failed to delete animal:", error)
    }


  }

  if(animal === null){
    return(
      <p>Loading animal..</p>
    )
  }

  const animalImage = animalImages[animal.image];


  return (
    <div className={styles.animalDetailsMainContainer}>

      <Link className={styles.animalDetailsLink} to={"/animals"}><LuArrowLeft />Back to animals</Link>

      <header className={styles.animalDetailsHeader}>

        <div  className={styles.animalDetailsHeaderText}>
          <h1>{animal.name}</h1>
          <StatusBadge status={animal.status}/>
          
        </div>
       
        <div className={styles.animalDetailsbuttons}>
          <button className={styles.animalDetailsbuttonsEdit}  onClick={openEditModal}><LuPencilLine /> Edit</button>

          <button
            className={styles.animalDetailsbuttonsDelete}
            onClick={deleteAnimal}
            disabled={animal.isDemoProtected}
            title={animal.isDemoProtected ? "Demo animal – deletion is disabled because this animal is linked to adoption applications." : "Delete animal" } > <LuTrash2 /> Delete
          </button>

        </div>     

      </header>

      <section className={styles.animalDetailsData}>
        <div>
          <img src={animalImage} alt={animal.name} />
        </div>
        <div className={styles.animalDetailsOverview}>
          <h2>Overview</h2>

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

      {/* tabs */}
      <section className={styles.animalDetailsTabs}>

        <div className={styles.tabButtons}>

          <button
            type="button"
            className={activeTab === "overview" ? styles.activeTab : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          <button
            type="button"
            className={activeTab === "medical" ? styles.activeTab : ""}
            onClick={() => setActiveTab("medical")}
          >
            Medical
          </button>

          <button
            type="button"
            className={activeTab === "notes" ? styles.activeTab : ""}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </button>

          <button
            type="button"
            className={activeTab === "history" ? styles.activeTab : ""}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>

        </div>

        <div className={styles.tabContent}>

          {activeTab === "overview" && (
            <div>
              <h3>About {animal.name}</h3>
              <p>{animal.description}</p>
            </div>
          )}

          {activeTab === "medical" && (
            <div>
              <h3>Medical information</h3>
              <p>{animal.medicalNotes}</p>
            </div>
          )}

          {activeTab === "notes" && (
            <div>
              <h3>Notes</h3>
              <p>{animal.notes}</p>
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h3>History</h3>
              <p>{animal.history}</p>
            </div>
          )}

        </div>

      </section>

      
      {/* modal */}
      {isEditModalOpen && (<EditAnimalModal animal={animal} setAnimal={setAnimal} onClose={closeEditModal}/>)}

    </div>
  )
}
