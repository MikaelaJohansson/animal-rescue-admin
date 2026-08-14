import { LuPencilLine } from "react-icons/lu";
import { Link } from "react-router-dom";
import animalImages from "../../../Data/animalImages";
import StatusBadge from "../../StatusBadge/StatusBadge";
import styles from "./AdoptionsTable.module.css";



export default function AdoptionsTable({ applications }) {


  return (
    <div className={styles.tableMainContainer}>


      <table className={styles.tableContainer}>


        <thead>
          <tr className={styles.tableHeadRow}>

            <th>
              Applicant
            </th>


            <th>
              Animal
            </th>


            <th>
              Date Applied
            </th>


            <th>
              Status
            </th>


            <th>
              Actions
            </th>
          </tr>
        </thead>



        <tbody>
          {applications.map((application) => {


            const animalImage = animalImages[application.animalImage];


            return (
              <tr key={application.id} className={styles.tableBodyRow} >

                <td>

                  <div>{application.applicantName}</div>

                  <div className={styles.tableBodyRowEmail}>
                    {application.email}
                  </div>

                </td>


                <td>
                  <div className={styles.tableBodyRowAnimal}>
                    <img
                      className={styles.tableBodyRowImg}
                      src={animalImage}
                      alt={application.animalName}
                      loading="lazy"
                    />

                    <span>{application.animalName}</span>
                  </div>
                </td>


                <td>
                  {application.dateApplied.toDate().toLocaleDateString()}
                </td>


                <td>
                  <StatusBadge status={application.status} />
                </td>


                <td className={styles.tableBodyRowTd}>
                  <Link to={`/adoptionDetails/${application.id}`}>
                    <LuPencilLine />
                  </Link>
                </td>


              </tr>
            );
          })}
        </tbody>


      </table>


    </div>
  );
}