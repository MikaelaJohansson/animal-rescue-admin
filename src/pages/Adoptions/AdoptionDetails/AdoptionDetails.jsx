import { useEffect, useState } from "react"
import { db } from "../../../firebase"
import { getDoc, doc } from "firebase/firestore"
import { useParams, Link } from "react-router-dom"
import styles from "./AdoptionDetails.module.css"
import StatusBadge from "../../../components/StatusBadge/StatusBadge"
import animalImages from "../../../Data/animalImages"


export default function AdoptionDetails() {

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [applicationData, setApplicationData] = useState("")
  const [activeTab, setActiveTab] = useState("general")
  const [selectedStatus, setSelectedStatus] = useState("")

  const { adoptionId } = useParams()


  useEffect(() => {

    async function getApplication() {

      setIsLoading(true)

      try {

        const applicationDocumentReference = doc(
          db,
          "adoptionApplications",
          adoptionId
        )

        const snapshot = await getDoc(applicationDocumentReference)

        if (!snapshot.exists()) {
          setErrorMessage("Could not find application.")
          return
        }


        // Get saved demo statuses from sessionStorage
        const savedStatuses = JSON.parse(sessionStorage.getItem("adoptionStatuses")) || {}


        // Check if this application has a saved demo status
        const savedStatus = savedStatuses[adoptionId]


        // Use saved status if it exists.
        // Otherwise use the original Firestore status.
        const currentStatus = savedStatus || snapshot.data().status


        // Save application data in React state
        setApplicationData({
          ...snapshot.data(),
          status: currentStatus
        })


        // Set the status shown in the dropdown
        setSelectedStatus(currentStatus)

        setErrorMessage("")

      } catch (error) {

        console.error(error)
        setErrorMessage("Could not find application.")

      } finally {

        setIsLoading(false)

      }
    }


    getApplication()

  }, [adoptionId])



  function handleUpdateStatus() {

    // Save application status
    const savedStatuses =
      JSON.parse(sessionStorage.getItem("adoptionStatuses")) || {}

    savedStatuses[adoptionId] = selectedStatus

    sessionStorage.setItem(
      "adoptionStatuses",
      JSON.stringify(savedStatuses)
    )


    // Get temporary animal statuses
    const savedAnimalStatuses =
      JSON.parse(sessionStorage.getItem("animalStatuses")) || {}


    if (selectedStatus === "Approved") {

      // Approved application = animal becomes adopted
      savedAnimalStatuses[applicationData.animalId] = "Reserved"

    } else {

      // Application is no longer approved.
      // Remove the adoption override.
      delete savedAnimalStatuses[applicationData.animalId]

    }


    sessionStorage.setItem(
      "animalStatuses",
      JSON.stringify(savedAnimalStatuses)
    )


    // Update application on the page
    setApplicationData({
      ...applicationData,
      status: selectedStatus
    })
  }



  if (isLoading) {
    return <p>Loading application...</p>
  }


  if (errorMessage) {
    return <p>{errorMessage}</p>
  }


  const animalImage = animalImages[applicationData.animalImage]


  return (
    <div className={styles.adoptionDetailsMainContainer}>

      <div className={styles.adoptionDetailsLink}>
        <Link to="/adoptions">
          Back to applications
        </Link>
      </div>


      <div className={styles.adoptionDetailsContainer}>


        {/* Applicant information */}
        <div className={styles.adoptionDetailsApplicant}>

          <h2>Applicant information</h2>

          <p>
            <strong>Name:</strong> {applicationData.applicantName}
          </p>

          <p>
            <strong>Email:</strong> {applicationData.email}
          </p>

          <p>
            <strong>Phone:</strong> {applicationData.phone}
          </p>

        </div>



        {/* Requested animal */}
        <div className={styles.adoptionDetailsRequest}>

          <h2>Requested animal</h2>

          <div className={styles.adoptionDetailsData}>
            <img
              src={animalImage}
              alt={applicationData.animalName}
              width={100}
            />

            <div>
             <strong> <p>{applicationData.animalName}</p></strong>

              <StatusBadge status={selectedStatus} />
            </div>
            
          </div>
          

        </div>



        {/* Application details */}
        <div className={styles.adoptionDetailsDetails}>

          <h2>Application Details</h2>

          <section className={styles.adoptionDetailsTabs}>

            <div className={styles.tabButtons}>

              <button
                type="button"
                className={
                  activeTab === "general"
                    ? styles.activeTab
                    : ""
                }
                onClick={() => setActiveTab("general")}
              >
                General
              </button>

              <button
                type="button"
                className={
                  activeTab === "experience"
                    ? styles.activeTab
                    : ""
                }
                onClick={() => setActiveTab("experience")}
              >
                Experience
              </button>


              <button
                type="button"
                className={
                  activeTab === "workSituation"
                    ? styles.activeTab
                    : ""
                }
                onClick={() => setActiveTab("workSituation")}
              >
                Work situation
              </button>


              <button
                type="button"
                className={
                  activeTab === "notes"
                    ? styles.activeTab
                    : ""
                }
                onClick={() => setActiveTab("notes")}
              >
                Notes
              </button>

            </div>


            <div className={styles.tabContent}>

              {activeTab === "experience" && (
                <div>
                  <h3>Experience</h3>
                  <p>{applicationData.experience}</p>
                </div>
              )}


              {activeTab === "workSituation" && (
                <div>
                  <h3>Work situation</h3>
                  <p>{applicationData.workSituation}</p>
                </div>
              )}


              {activeTab === "notes" && (
                <div>
                  <h3>Notes</h3>
                  <p>{applicationData.notes}</p>
                </div>
              )}


              {activeTab === "general" && (
                <div>
                  <h3>General</h3>

                  <ul className={styles.generalList}>
                    <li>
                      {applicationData.hasGarden
                        ? "Has garden"
                        : "No garden"}
                    </li>

                    <li>
                      {applicationData.hasOtherPets
                        ? "Has other pets"
                        : "No other pets"}
                    </li>

                    <li>
                      {applicationData.householdMembers
                        ? applicationData.householdMembers
                        : "Single household"}
                    </li>

                    <li>
                      {applicationData.housingType}
                    </li>
                  </ul>
                </div>
              )}

            </div>

          </section>

        </div>



        {/* Status */}
        <div className={styles.adoptionDetailsStatus}>

          <h2>Status</h2>

          <label htmlFor="applicationStatus">
           <strong><h3>Current status</h3></strong>
          </label>

          <select
            id="applicationStatus"
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value)
            }
          >

            <option value="New">
              New
            </option>

            <option value="In Review">
              In Review
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>


          <button className={styles.adoptionDetailsStatusbutton} type="button" onClick={handleUpdateStatus}>
            Update Status
          </button>

        </div>

      </div>

    </div>
  )
}