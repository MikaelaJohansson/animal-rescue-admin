import { useEffect, useState } from "react"
import {db} from "../../../firebase"
import { getDoc, doc } from "firebase/firestore";
import {useParams, Link} from 'react-router-dom'
import styles from "./AdoptionDetails.module.css"


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

    
  return (
    <div>
        AdoptionDetails <br />
        <Link to={"/adoptions"}>back to aplications</Link> <br />
        {applicationData.animalName}

    </div>
  )
}
