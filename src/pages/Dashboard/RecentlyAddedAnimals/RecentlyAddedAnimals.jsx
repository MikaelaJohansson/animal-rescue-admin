import styles from "./RecentlyAddedAnimals.module.css"
import animalImages from "../../../Data/animalImages";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";
import { Link } from "react-router-dom";

export default function RecentlyAddedAnimals({animals}) {

    // Sorts the animals by date, with the newest first.
    const sortedAnimals = [...animals].sort((firstAnimal, secondAnimal) => {
        return new Date(secondAnimal.dateAdded) - new Date(firstAnimal.dateAdded)
    })

    // Gets the first five animals from the sorted list.
    const recentAnimals = sortedAnimals.slice(0, 5);

   

    return (
        <section className={styles.recentAnimalsContainer}>

            <div className={styles.recentAnimalsHeader}>
                <h2>Recently Added Animals</h2>
            </div>

            <div className={styles.recentAnimalsList}>

                {recentAnimals.map((animal) => {

                    const animalImage = animalImages[animal.image];

                    return (
                    <Link key={animal.id} className={styles.recentAnimalRow} to={`/animals/${animal.id}`} >

                        <img className={styles.recentAnimalImage}src={animalImage} alt={`${animal.name}, ${animal.breed}`} />

                        <div className={styles.recentAnimalInformation}>

                            <h3>{animal.name}</h3>

                            <p>
                                {animal.breed} · {animal.age} years
                            </p>

                            <p className={styles.recentAnimalDate}>
                                Added: {animal.dateAdded}
                            </p>

                        </div>

                        <div className={styles.recentAnimalStatus}>
                            <StatusBadge status={animal.status} />
                        </div>

                    </Link>
                    );

                })}

            </div>

        </section>
    );
}
