import {Link} from "react-router-dom"
import { LuPencilLine } from "react-icons/lu";
import animalImages from "../../../Data/animalImages";
import styles from "./AnimalsTable.module.css"
import StatusBadge from "../../StatusBadge/StatusBadge";


export default function AnimalsTable({animals}) {


  return (
    <div className={styles.tableMainContainer }>

        <table className={styles.tableContainer}>

            <thead>

                <tr className={styles.tableHeadRow}>
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

                        <tr key={animal.id} className={styles.tableBodyRow}>

                            <td>
                                <img  className={styles.tableBodyRowImg}
                                src={animalImage}
                                alt={`${animal.name}, ${animal.breed}`}
                                width={80}
                                loading="lazy"
                                />
                            </td>

                            <td>{animal.name}</td>
                            <td>{animal.breed}</td>
                            <td>{animal.age}</td>
                            <td>{animal.gender}</td>
                            <td><StatusBadge status={animal.status}/></td>

                            <td className={styles.tableBodyRowTd}> <Link to={`/animals/${animal.id}`}><LuPencilLine /></Link></td>
                           

                        </tr>

                    )

                })}

            </tbody>

        </table>

    </div>

  )
}
