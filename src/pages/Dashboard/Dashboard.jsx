import DashboardStatCard from "../../components/DashboardStatCard/DashboardStatCard"
import styles from "../Dashboard/Dashborad.module.css"
import RecentlyAddedAnimals from "../Dashboard/RecentlyAddedAnimals/RecentlyAddedAnimals";
import { Dog,Heart,ShieldCheck,Handshake,Stethoscope,Hourglass } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Dashboard() {

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [animals, setAnimals] = useState([])

  useEffect(()=>{

    async function getAnimals(){

      try{

        setIsLoading(true)

        // Points to the "animals" collection.
        const animalCollection = collection(db,"animals")

        // Goes to the saved path and retrieves everything from it.
        const snapshot = await getDocs(animalCollection)

        const savedAnimalStatuses = JSON.parse(sessionStorage.getItem("animalStatuses")) || {}

        const animalData = snapshot.docs.map((document) => {

          const animal = document.data()

          const savedStatus = savedAnimalStatuses[document.id]

          return {
            id: document.id,
            ...animal,
            status: savedStatus || animal.status
          }

        })

        setAnimals(animalData)
        setErrorMessage("")

      }catch(error){
        console.error("Failed to load dashboard animals:", error);
        setErrorMessage("Failed to load dashboard data.");
      }finally{
        setIsLoading(false);
      }
    }

    getAnimals();

  },[])

  const availableAnimals = animals.filter((animal)=>{
    return animal.status === "Available"
  })

  const adoptedAnimals = animals.filter((animal=>{
    return animal.status === "Adopted"
  }))

  const medicalHoldAnimals = animals.filter((animal)=>{
    return animal.status === "Medical Hold"
  })

  const fosterCareAnimals = animals.filter((animal)=>{
    return animal.status === "In Foster Care"
  })

   const reservedAnimals = animals.filter((animal)=>{
    return animal.status === "Reserved"
  })


  return (
    <section className={styles.dashboardCointainer}>

      {errorMessage && <p>{errorMessage}</p>}

      <div className={styles.dashboardCards}>
        <DashboardStatCard
          title="Total animals"
          value={isLoading ? "..." : animals.length}
          statusText="Registered animals"
          icon={Dog}
          color="pink"
        />

        <DashboardStatCard
          title="Available Animals"
          value={isLoading ? "..." : availableAnimals.length}
          statusText="Ready for adoption"
          icon={Heart}
          color="green"
        />

        <DashboardStatCard
          title="Adopted Animals"
          value={isLoading ? "..." : adoptedAnimals.length}
          statusText="Found a new home"
          icon={ShieldCheck}
          color="purple"
        />

        <DashboardStatCard
          title="Medical Hold"
          value={isLoading ? "..." : medicalHoldAnimals.length}
          statusText="Receiving medical care"
          icon={Stethoscope}
          color="red"
        />

        <DashboardStatCard
          title="In Foster Care"
          value={isLoading ? "..." : fosterCareAnimals.length}
          statusText="Living with foster families"
          icon={Handshake}
          color="blue"
        />

        <DashboardStatCard
          title="Reserved Animals"
          value={isLoading ? "..." : reservedAnimals.length}
          statusText="Awaiting adoption"
          icon={Hourglass}
          color="orange"
        />
      </div> 

      <RecentlyAddedAnimals animals={animals} />     

    </section>
  )
}
