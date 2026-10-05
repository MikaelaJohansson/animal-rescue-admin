import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot
} from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./Adoptions.module.css";
import AdoptionsFilters from "../../components/Filters/AdoptionsFilters/AdoptionsFilters";
import AdoptionsTable from "../../components/Table/AdoptionsTable/AdoptionsTable";
import ListPageSkeleton from "../../components/Skeleton/ListPageSkeleton/ListPageSkeleton";


export default function Adoptions() {

    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [searchText, setSearchText] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDateSort, setSelectedDateSort] = useState("");


    useEffect(() => {

        const applicationsCollection = collection(
            db,
            "adoptionApplications"
        );


        const unsubscribe = onSnapshot(
            applicationsCollection,

            (snapshot) => {

                const applicationsData = snapshot.docs.map(
                    (document) => {

                        return {
                            id: document.id,
                            ...document.data()
                        };

                    }
                );


                setApplications(applicationsData);

                setErrorMessage("");

                setIsLoading(false);

            },

            (error) => {

                console.error(
                    "Failed to load adoption applications:",
                    error
                );

                setErrorMessage(
                    "Failed to load adoption applications."
                );

                setIsLoading(false);

            }
        );


        return () => {
            unsubscribe();
        };

    }, []);


    const filteredApplications = applications.filter(
        (application) => {

            const search = searchText.toLowerCase();


            const matchesSearch =
                application.applicantName
                    .toLowerCase()
                    .includes(search) ||

                application.email
                    .toLowerCase()
                    .includes(search) ||

                application.animalName
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                selectedStatus === "" ||
                application.status === selectedStatus;


            return (
                matchesSearch &&
                matchesStatus
            );

        }
    );


    let sortedApplications =
        filteredApplications;


    if (selectedDateSort === "Newest first") {

        sortedApplications =
            filteredApplications.toSorted((a, b) => {

                return (
                    b.dateApplied.toMillis() -
                    a.dateApplied.toMillis()
                );

            });

    }


    if (selectedDateSort === "Oldest first") {

        sortedApplications =
            filteredApplications.toSorted((a, b) => {

                return (
                    a.dateApplied.toMillis() -
                    b.dateApplied.toMillis()
                );

            });

    }


    if (isLoading) {

        return <ListPageSkeleton />;

    }


    return (

        <section className={styles.adoptionsContainer}>


            <div className={styles.adoptionsHeader}>

                <h1>
                    Adoption Applications
                </h1>

                <p>
                    Review and manage incoming adoption applications.
                </p>

            </div>


            {errorMessage && (

                <p>
                    {errorMessage}
                </p>

            )}


            <AdoptionsFilters
                searchText={searchText}
                setSearchText={setSearchText}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedDateSort={selectedDateSort}
                setSelectedDateSort={setSelectedDateSort}
            />


            <AdoptionsTable
                applications={sortedApplications}
            />

        </section>

    );

}