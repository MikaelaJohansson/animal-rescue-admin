import animalImages from "../../../Data/animalImages";


export default function AnimalsTable({animals}) {




  return (
    <div>

        <h1>AnimalsTable</h1>

        <table>

            <thead>

                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>

            </thead>

            <tbody>

                {animals.map((animal)=>{

                    const animalImage = animalImages[animal.image];

                    return(

                        <tr key={animal.id}>
                            
                            <td>
                                <img
                                src={animalImage}
                                alt={`${animal.name}, ${animal.breed}`}
                                width={100}
                                loading="lazy"
                                />
                            </td>

                            <td>{animal.name}</td>
                            <td>{animal.breed}</td>
                            <td>{animal.age}</td>
                            <td>{animal.gender}</td>
                            <td>{animal.status}</td>

                            <td>
                                <button type="button">View</button>
                            </td>
                        </tr>

                    )

                })}

            </tbody>

        </table>

    </div>
  )
}
