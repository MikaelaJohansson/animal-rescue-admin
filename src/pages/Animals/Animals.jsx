
import styles from "../Animals/Animals.module.css"

export default function Animals() {




  return (
    <div className={styles.animalsMainContainer}>
      <div className={styles.animalsContainer}>

        <div>
           <h1>Animals</h1>
            <p>View and manage all animals in our care</p>
        </div>

        <div className={styles.animalsSearch}>
          <input type="text" />
          <select name="" id=""></select>
          <select name="" id=""></select>
          <select name="" id=""></select>
          <select name="" id=""></select>
          <button>add animals</button>
        </div>

        <div className={styles.animalsGridLabels}>
          <label>photo</label>
          <label>Name</label>
          <label>Species</label>
          <label>Breed</label>
          <label>Age</label>
          <label>Grender</label>
          <label>Status</label>
          <label>Actions</label>
        </div>

        <div className={styles.animalsApiAcctions}>
          api
        </div>

        <div className={styles.animalsPageNummers}>
          sid nummer
        </div>
        
      </div>
    </div>
  )
}
