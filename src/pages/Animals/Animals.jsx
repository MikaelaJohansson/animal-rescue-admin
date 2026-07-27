
import { useEffect, useState } from "react"
import {collection, getDocs} from "firebase/firestore"
import {db} from "../../firebase"
import styles from "../Animals/Animals.module.css"
import AnimalsTable from "../../components/Table/AnimalsTable/AnimalsTable"
import AnimalsFilters from "../../components/Filters/AnimalsFilters/AnimalsFilters"
import AddAnimalModal from "../../components/Modals/AddAnimalModal/AddAnimalModal"

export default function Animals() {

  const [animals, setAnimals] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText,setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  

  // Fetches animals and their IDs from the database.
  useEffect(()=>{

    async function getAnimals(){

      try{

        setIsLoading(true)

        const animalCollection = collection(db,"animals")

        const snapshot = await getDocs(animalCollection)

        const animalData = snapshot.docs.map((doc)=>{

          return {
            id: doc.id, ...doc.data()
          }

        })

        setAnimals(animalData)


      }catch(error){
        setErrorMessage("Failed to load animals.");
      }finally{
        setIsLoading(false);
      }

    }

    getAnimals();

  },[])


  // close/open modal
  function handleOpenAddModal() {
    setIsAddModalOpen(true);
  }
  function handleCloseAddModal() {
    setIsAddModalOpen(false);
  }


  // Filters animals based on the selected criteria.
  const filteredAnimals = animals.filter((animal)=>{

    const searchValue  = searchText.toLowerCase();

    const matchesName  = animal.name.toLowerCase().includes(searchValue)
    const matchesBreed = animal.breed.toLowerCase().includes(searchValue)

    const matchesStatus = selectedStatus === "" || animal.status === selectedStatus

    const matchesGender = selectedGender === "" || animal.gender === selectedGender

    return(
     ( matchesName || matchesBreed) && matchesStatus && matchesGender
    )

  })


  return (
    <div className={styles.animalsMainContainer}>

      <AnimalsFilters  
        searchText={searchText}  
        setSearchText={setSearchText}  
        selectedStatus = {selectedStatus}  
        setSelectedStatus = {setSelectedStatus}
        selectedGender = {selectedGender}
        setSelectedGender = {setSelectedGender}
        onOpenAddModal={handleOpenAddModal}
        >       
      </AnimalsFilters>
      
      {/* modal add animal */}
      {isAddModalOpen && (<AddAnimalModal onClose={handleCloseAddModal} setAnimals={setAnimals} />)}

      <AnimalsTable animals ={filteredAnimals}></AnimalsTable>

      
    </div>
  )
  
}
