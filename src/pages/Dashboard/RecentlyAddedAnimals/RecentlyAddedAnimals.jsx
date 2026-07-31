import React from 'react'
import styles from "./RecentlyAddedAnimals.module.css"
import animalImages from "../../../Data/animalImages";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";

export default function RecentlyAddedAnimals({animals}) {

    // Sorts the animals by date, with the newest first.
    const sortedAnimals = [...animals].sort((firstAnimal, secondAnimal) => {
        return new Date(secondAnimal.dateAdded) - new Date(firstAnimal.dateAdded)
    })

    // Gets the first five animals from the sorted list.
    const recentAnimals = sortedAnimals.slice(0, 5);

   

  return (
    <section>

        <h2>Recently Added Animals</h2>

        <div>

            {recentAnimals.map((animal) => {

                const animalImage = animalImages[animal.image];

                return (
                    <article key={animal.id}>

                        <img src={animalImage} alt={`${animal.name}, ${animal.breed}`} width={100}/>

                        <div>
                            <h3>{animal.name}</h3>
                            <p>{animal.breed}</p>
                            <p>{animal.age} years</p>

                            <StatusBadge status={animal.status} />

                            <p>Added: {animal.dateAdded}</p>
                        </div>

                    </article>
                );

            })}

        </div>

    </section>
    );
}
