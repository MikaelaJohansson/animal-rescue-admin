import styles from "./StatusBadge.module.css";

export default function StatusBadge({status}) {

    function getStatusClass (status) {

        if(status === "Available" || status === "Approved"){
            return styles.available;
        }
        if(status === "Adopted" || status === "In Review"){
            return styles.adopted;
        }
        if(status === "Reserved"){
            return styles.reserved;
        }
        if(status === "Medical Hold" || status === "Rejected"){
            return styles.medicalHold;
        }
        if(status === "In Foster Care" || status === "New"){
            return styles.fosterCare
        }
        return ""
    }

  return (
    <span className={`${styles.status} ${getStatusClass(status)}`}>
        {status}
    </span>
  )
}
