import {useEffect, useState} from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
import styles from "./Adoptions.module.css"
import AdoptionsFilters from '../../components/Filters/AdoptionsFilters/AdoptionsFilters'
import AdoptionsTable from "../../components/Table/AdoptionsTable/AdoptionsTable";

export default function Adoptions() {

    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // states for filters
    const [searchText,setSearchText] = useState("")
    const [selectedStatus,setSelectedStatus] = useState("")
    const [selectedDateSort,setSelectedDateSort] = useState("")


    // Fetches applications from Firestore.
    useEffect(()=>{

        async function getApplications(){
            
            try{

                setIsLoading(true)

                const applicationsCollection = collection(db,"adoptionApplications")

                const snapshot = await getDocs(applicationsCollection)

                const applicationsData = snapshot.docs.map((document) => {

                    return {
                    id: document.id,
                    ...document.data()
                    };

                });

                setApplications(applicationsData)
                setErrorMessage("")

            }catch(error){
                console.error("Failed to load adoption applications:", error);
                setErrorMessage("Failed to load adoption applications.");

            }finally{
                setIsLoading(false);
            }
        }

        getApplications();

    },[])

    const filteredApplications  = applications.filter((application)=>{

        const search = searchText.toLowerCase();

        const matchesSearch  = 
        application.applicantName.toLowerCase().includes(search) || 
        application.email.toLowerCase().includes(search) ||
        application.animalName.toLowerCase().includes(search)

        const matchesStatus  = selectedStatus === "" || application.status === selectedStatus  


        return(
            matchesSearch && matchesStatus
        )
    })

    let sortedApplications = filteredApplications

    console.log(selectedDateSort);
    
    if(selectedDateSort  === "Newest first"){

        sortedApplications = filteredApplications.toSorted((a,b)=>{
            return b.dateApplied.toMillis() - a.dateApplied.toMillis();
        })

    }

    if(selectedDateSort === "Oldest first" ){

        sortedApplications = filteredApplications.toSorted((a, b) => {
            return a.dateApplied.toMillis() - b.dateApplied.toMillis();
        });

    }


    return (
        <section className={styles.adoptionsContainer}>

            <div className={styles.adoptionsHeader}>
                <h1>Adoption Applications</h1>
                <p>Review and manage incoming adoption applications.</p>
            </div>
          

            <AdoptionsFilters 
                searchText={searchText}
                setSearchText={setSearchText}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedDateSort={selectedDateSort}
                setSelectedDateSort={setSelectedDateSort}>
            </AdoptionsFilters>

            <AdoptionsTable applications={sortedApplications} />
        </section>
    )
}
