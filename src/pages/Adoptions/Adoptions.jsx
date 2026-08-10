import {useEffect, useState} from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
import styles from "./Adoptions.module.css"
import AdoptionsFilters from '../../components/Filters/AdoptionsFilters/adoptionsFilters'
import AdoptionsTable from "../../components/Table/AdoptionsTable/AdoptionsTable";

export default function Adoptions() {

    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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



    return (
        <section className={styles.adoptionsContainer}>
            <h1>Adoption Applications</h1>
            <p>Review and manage incoming adoption applications.</p>
            <AdoptionsFilters applications={applications}></AdoptionsFilters>
            <AdoptionsTable applications={applications} />
        </section>
    )
}
