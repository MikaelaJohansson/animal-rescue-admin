import { useEffect, useState } from "react"
import {db} from "../../../firebase"
import { getDoc, doc } from "firebase/firestore";
import {useParams, Link} from 'react-router-dom'
import styles from "./AdoptionDetails.module.css"
import StatusBadge from "../../../components/StatusBadge/StatusBadge"
import animalImages from "../../../Data/animalImages";


export default function AdoptionDetails() {

    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [applicationData, setApplicationData] = useState("")

    const {adoptionId} = useParams()



    useEffect(()=>{

        async function getApplication (){

            setIsLoading(true)

            try{

                const applicationDocumentReference = doc(db,"adoptionApplications", adoptionId)

                const snapshot = await getDoc(applicationDocumentReference)

                if(!snapshot.exists()){
                    setErrorMessage("Could not find application.")
                    return
                }

                setApplicationData(snapshot.data())
                setErrorMessage("")

            }catch(error){
                console.error(error)
                setErrorMessage("Could not find application.")

            }finally{
                setIsLoading(false)
            }


        }

        getApplication()


    },[adoptionId])

    if(isLoading){
        return <p>Loading application...</p>
    }

    if(errorMessage){
        return <p>{errorMessage}</p>
    }

    const animalImage = animalImages[applicationData.animalImage];

    
  return (
    <div className={styles.adoptionDetailsMainContainer}>

        <p className={styles.adoptionDetailsLink}>
            <Link to={"/adoptions"}>back to aplications</Link> <br />
        </p>
        
       
        <div className={styles.adoptionDetailsContainer}>

            <div className={styles.adoptionDetailsApplicant}>
                <h2>Applicant information</h2>
                <p>
                    Name: {applicationData.applicantName}
                    Email: {applicationData.email}
                    Phone: {applicationData.phone}

                </p>
            </div>

            <div className={styles.adoptionDetailsRequest}>
                <h2>Requested animal</h2>
                    <img src={animalImage} alt={applicationData.animalName}/>
                    {applicationData.animalName}
            </div>

            <div className={styles.adoptionDetailsDetails}>
                <h2>Application Detils</h2>
            </div>

            <div className={styles.adoptionDetailsStatus}>
                <h2>Status</h2>
               
                <StatusBadge status={applicationData.status}/>
            </div>
        </div>

    </div>
  )
}
