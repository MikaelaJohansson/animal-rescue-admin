import { Link } from "react-router-dom";
import styles from "../DashboardStatCard/DashboardStatCard.module.css"

export default function DashboardStatCard({title,value,icon,statusText,color,to}) {

    const Icon = icon

  return (
    <Link to={to} className={styles.dashboardStatCardContainer}>
        
        <div className={`${styles.dashboardStatCardIcon} ${styles[`${color}Background`]}`}>
            {icon && <Icon />}
        </div>

        <section className={styles.dashboardStatCardData}>
            <h1 className={styles.dashboardStatCardTitle}>{title}</h1>
            <h2 className={styles.dashboardStatCardValue}>{value}</h2>
            <p className={`${styles.dashboardStatCardStatus} ${styles[`${color}Text`]}`}>{statusText}</p>
        </section>
        
    </Link>
  )
}
