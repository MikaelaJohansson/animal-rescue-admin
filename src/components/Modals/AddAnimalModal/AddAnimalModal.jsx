
import styles from "./AddAnimalModal.module.css"


export default function AddAnimalModal({ onClose }) {





  return (
    <div className={styles.addAnimalMainContainer}>

      <div className={styles.addAnimalContainer}>

        <h1>Add animal</h1>

        <p>
          Fill in the details below to create anew animal
        </p>

        <form className={styles.addAnimalForm} action="">

          <label htmlFor="name">Name</label>
          <input type="text" id="name" required/>

          <label htmlFor="breed">Breed</label>
          <input type="text" id="breed" required/>

          <label htmlFor="age">Age</label>
          <input type="text" id="age" />

          <label htmlFor="gender">Gender</label>
          <input type="text" id="gender" />

          <label htmlFor="weight">Weight (kg)</label>
          <input type="text" id="weight" />

          <label htmlFor="color">Color</label>
          <input type="text" id="color" />

          <label htmlFor="date">Date added</label>
          <input type="date" id="date" />
            
          <div className={styles.addAnimalFormCheckbox}>
            <label htmlFor="vaccinated">Vaccinated</label>
            <input type="checkbox" id="vaccinated" />
            &nbsp;&nbsp;&nbsp;
            <label htmlFor="neutered">Neutered</label>
            <input type="checkbox" id="neutered" />
          </div>

          <button onClick={onClose}>Cancel</button>
          <button type="submit" >Save animal</button>

        </form>        

      </div>

    </div>
  );
}
