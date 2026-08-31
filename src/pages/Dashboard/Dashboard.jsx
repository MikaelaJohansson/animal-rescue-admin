import DashboardStatCard from "../../components/DashboardStatCard/DashboardStatCard"
import styles from "../Dashboard/Dashborad.module.css"
import RecentlyAddedAnimals from "../Dashboard/RecentlyAddedAnimals/RecentlyAddedAnimals";
import { Dog,Heart,ShieldCheck,Handshake,Stethoscope,Hourglass } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import TodaysSchedule from "./TodaysSchedule/TodaysSchedule";

export default function Dashboard() {

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [animals, setAnimals] = useState([])
  const [todayEvents,setTodayEvents] = useState([])


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

  useEffect(() => {

    async function getTodayEvents() {

      // Gets the currently signed-in user from Firebase Authentication.
      const currentUser = auth.currentUser

      // Stops the function if no user is signed in.
      if (!currentUser) {
        return;
      }

      // Gets today's date in YYYY-MM-DD format.
      const today = new Date().toISOString().split("T")[0]

      try {

        // Points to the "calendarEvents" collection in Firestore.
        const calendarEventsCollection = collection(db, "calendarEvents")

        // Creates a query for the signed-in user's events for today.
        const todayEventsQuery = query(
          calendarEventsCollection,
          where("userId", "==", currentUser.uid),
          where("date", "==", today)
        )

        // Gets the documents that match the query.
        const snapshot = await getDocs(todayEventsQuery)

        // Converts the Firestore documents into a regular JavaScript array.
        const eventData = snapshot.docs.map((document) => {

          const data = document.data()

          return {
            id: document.id,
            title: data.title,
            date: data.date,
            time: data.time
          }

        })

        // Saves today's events in React state.
        setTodayEvents(eventData)

      } catch (error) {
        console.error("Could not load today's events:", error)
      }

    }

    getTodayEvents()

  }, [])

  const availableAnimals = animals.filter((animal)=>{
    return animal.status === "Available"
  })

  const adoptedAnimals = animals.filter((animal) => {
    return animal.status === "Adopted"
  })

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
          to={"/animals"}
        />

        <DashboardStatCard
          title="Available Animals"
          value={isLoading ? "..." : availableAnimals.length}
          statusText="Ready for adoption"
          icon={Heart}
          color="green"
          to={"/animals?status=Available"}
        />

        <DashboardStatCard
          title="Adopted Animals"
          value={isLoading ? "..." : adoptedAnimals.length}
          statusText="Found a new home"
          icon={ShieldCheck}
          color="purple"
          to="/animals?status=Adopted"
        />

        <DashboardStatCard
          title="Medical Hold"
          value={isLoading ? "..." : medicalHoldAnimals.length}
          statusText="Receiving medical care"
          icon={Stethoscope}
          color="red"
          to={"/animals?status=Medical Hold"}
        />

        <DashboardStatCard
          title="In Foster Care"
          value={isLoading ? "..." : fosterCareAnimals.length}
          statusText="Living with foster families"
          icon={Handshake}
          color="blue"
          to={"/animals?status=In Foster Care"}
        />

        <DashboardStatCard
          title="Reserved Animals"
          value={isLoading ? "..." : reservedAnimals.length}
          statusText="Awaiting adoption"
          icon={Hourglass}
          color="orange"
          to={"/animals?status=Reserved"}
        />
      </div> 

      <div className={styles.dashboardCointainerUppdates}>
        <RecentlyAddedAnimals animals={animals} />   

        <TodaysSchedule todayEvents={todayEvents}/>

      </div>

      

    </section>
  )
}
