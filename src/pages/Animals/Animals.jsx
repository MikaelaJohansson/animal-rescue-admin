
import styles from "../Animals/Animals.module.css"
import AnimalsTable from "../../components/Table/AnimalsTable/AnimalsTable"
import {collection, getDocs} from "firebase/firestore"
import {db} from "../../firebase"
import { useEffect, useState } from "react"

export default function Animals() {

  const [animals, setAnimals] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

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

  



  return (
    <div className={styles.animalsMainContainer}>
      <AnimalsTable animals ={animals}></AnimalsTable>
    </div>
  )
}
