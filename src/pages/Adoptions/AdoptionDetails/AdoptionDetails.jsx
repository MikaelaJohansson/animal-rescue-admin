import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
    getDoc,
    doc,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import styles from "./AdoptionDetails.module.css";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";
import animalImages from "../../../Data/animalImages";
import AdoptionDetailsSkeleton from "../../../components/Skeleton/AdoptionDetailsSkeleton/AdoptionDetailsSkeleton";


export default function AdoptionDetails({ userPermissions }) {

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [applicationData, setApplicationData] = useState(null);
    const [activeTab, setActiveTab] = useState("general");
    const [selectedStatus, setSelectedStatus] = useState("");

    const { adoptionId } = useParams();


    useEffect(() => {

        async function getApplication() {

            setIsLoading(true);

            try {

                const applicationDocumentReference = doc(
                    db,
                    "adoptionApplications",
                    adoptionId
                );

                const snapshot = await getDoc(
                    applicationDocumentReference
                );


                if (!snapshot.exists()) {

                    setErrorMessage(
                        "Could not find application."
                    );

                    return;

                }


                const application = {
                    id: snapshot.id,
                    ...snapshot.data()
                };


                setApplicationData(application);

                setSelectedStatus(
                    application.status
                );

                setErrorMessage("");


            } catch (error) {

                console.error(
                    "Failed to load application:",
                    error
                );

                setErrorMessage(
                    "Could not find application."
                );

            } finally {

                setIsLoading(false);

            }

        }


        getApplication();

    }, [adoptionId]);


    /* Admin status update */

    async function handleUpdateStatus() {

        if (!applicationData) {
            return;
        }


        if (selectedStatus === applicationData.status) {
            return;
        }


        const shouldNotifyManager =
            selectedStatus === "In Review" &&
            applicationData.status !== "In Review";


        try {

            const applicationDocumentReference = doc(
                db,
                "adoptionApplications",
                adoptionId
            );


            await updateDoc(
                applicationDocumentReference,
                {
                    status: selectedStatus
                }
            );


            setApplicationData({
                ...applicationData,
                status: selectedStatus
            });


            if (shouldNotifyManager) {

                const usersCollection = collection(
                    db,
                    "users"
                );


                const managerQuery = query(
                    usersCollection,
                    where("role", "==", "manager")
                );


                const managerSnapshot = await getDocs(
                    managerQuery
                );


                if (managerSnapshot.empty) {

                    console.error(
                        "Could not find a manager."
                    );

                    return;

                }


                const managerDocument =
                    managerSnapshot.docs[0];


                const notificationsCollection = collection(
                    db,
                    "notifications"
                );


                await addDoc(
                    notificationsCollection,
                    {
                        userId: managerDocument.id,

                        applicationId: adoptionId,

                        animalId: applicationData.animalId,

                        title:
                            "Application ready for review",

                        message:
                            `${applicationData.animalName}'s application is ready for review.`,

                        type:
                            "application_review",

                        isRead: false,

                        createdAt:
                            serverTimestamp()
                    }
                );

            }


        } catch (error) {

            console.error(
                "Failed to update application status:",
                error
            );

        }

    }


    /* Manager approval */

    async function handleApproveAdoption() {

        if (!applicationData) {
            return;
        }


        try {

            const applicationDocumentReference = doc(
                db,
                "adoptionApplications",
                adoptionId
            );


            const animalDocumentReference = doc(
                db,
                "animals",
                applicationData.animalId
            );


            await updateDoc(
                applicationDocumentReference,
                {
                    status: "Approved"
                }
            );


            await updateDoc(
                animalDocumentReference,
                {
                    status: "Adopted"
                }
            );


            setSelectedStatus("Approved");


            setApplicationData({
                ...applicationData,
                status: "Approved"
            });


        } catch (error) {

            console.error(
                "Failed to approve adoption:",
                error
            );

        }

    }


    if (isLoading) {

        return <AdoptionDetailsSkeleton />;

    }


    if (errorMessage) {

        return (
            <p>
                {errorMessage}
            </p>
        );

    }


    if (!applicationData) {

        return (
            <p>
                Could not find application.
            </p>
        );

    }


    const animalImage =
        animalImages[applicationData.animalImage];


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

                    <h2>
                        Applicant information
                    </h2>

                    <p>
                        <strong>Name:</strong>{" "}
                        {applicationData.applicantName}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {applicationData.email}
                    </p>

                    <p>
                        <strong>Phone:</strong>{" "}
                        {applicationData.phone}
                    </p>

                </div>


                {/* Requested animal */}

                <div className={styles.adoptionDetailsRequest}>

                    <h2>
                        Requested animal
                    </h2>


                    <div className={styles.adoptionDetailsData}>

                        <img
                            src={animalImage}
                            alt={applicationData.animalName}
                            width={100}
                        />


                        <div>

                            <p>
                                <strong>
                                    {applicationData.animalName}
                                </strong>
                            </p>

                            <StatusBadge
                                status={applicationData.status}
                            />

                        </div>

                    </div>

                </div>


                {/* Application details */}

                <div className={styles.adoptionDetailsDetails}>

                    <h2>
                        Application Details
                    </h2>


                    <section className={styles.adoptionDetailsTabs}>


                        <div className={styles.tabButtons}>

                            <button
                                type="button"
                                className={
                                    activeTab === "general"
                                        ? styles.activeTab
                                        : ""
                                }
                                onClick={() =>
                                    setActiveTab("general")
                                }
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
                                onClick={() =>
                                    setActiveTab("experience")
                                }
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
                                onClick={() =>
                                    setActiveTab("workSituation")
                                }
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
                                onClick={() =>
                                    setActiveTab("notes")
                                }
                            >
                                Notes
                            </button>

                        </div>


                        <div className={styles.tabContent}>


                            {activeTab === "experience" && (

                                <div>

                                    <h3>
                                        Experience
                                    </h3>

                                    <p>
                                        {applicationData.experience}
                                    </p>

                                </div>

                            )}


                            {activeTab === "workSituation" && (

                                <div>

                                    <h3>
                                        Work situation
                                    </h3>

                                    <p>
                                        {applicationData.workSituation}
                                    </p>

                                </div>

                            )}


                            {activeTab === "notes" && (

                                <div>

                                    <h3>
                                        Notes
                                    </h3>

                                    <p>
                                        {applicationData.notes}
                                    </p>

                                </div>

                            )}


                            {activeTab === "general" && (

                                <div>

                                    <h3>
                                        General
                                    </h3>


                                    <ul className={styles.generalList}>

                                        <li>
                                            {
                                                applicationData.hasGarden
                                                    ? "Has garden"
                                                    : "No garden"
                                            }
                                        </li>

                                        <li>
                                            {
                                                applicationData.hasOtherPets
                                                    ? "Has other pets"
                                                    : "No other pets"
                                            }
                                        </li>

                                        <li>
                                            {
                                                applicationData.householdMembers
                                                    ? applicationData.householdMembers
                                                    : "Single household"
                                            }
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

                    <h2>
                        Status
                    </h2>


                    {userPermissions?.canManageApplications ? (

                        <>

                            <label htmlFor="applicationStatus">

                                <h3>
                                    Current status
                                </h3>

                            </label>


                            <select
                                id="applicationStatus"
                                value={selectedStatus}
                                onChange={(event) =>
                                    setSelectedStatus(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="New">
                                    New
                                </option>

                                <option value="In Review">
                                    In Review
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>

                            </select>


                            <button
                                className={
                                    styles.adoptionDetailsStatusbutton
                                }
                                type="button"
                                onClick={handleUpdateStatus}
                            >
                                Update Status
                            </button>

                        </>


                    ) : userPermissions?.canApproveAdoption ? (

                        <>

                            <h3>
                                Current status
                            </h3>


                            <StatusBadge
                                status={applicationData.status}
                            />


                            {applicationData.status === "In Review" && (

                                <button
                                    className={
                                        styles.adoptionDetailsStatusbutton
                                    }
                                    type="button"
                                    onClick={handleApproveAdoption}
                                >
                                    Approve Adoption
                                </button>

                            )}

                        </>


                    ) : (

                        <>

                            <h3>
                                Current status
                            </h3>

                            <StatusBadge
                                status={applicationData.status}
                            />

                        </>

                    )}

                </div>

            </div>

        </div>

    );

}