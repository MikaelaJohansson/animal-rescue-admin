import React from 'react'
import styles  from "./DashboardSkeleton.module.css"

export default function DashboardSkeleton() {
  return (
    <div className={styles.dashboardSkeleton}>

        {/* Same area as the summary cards */}
        <div className={styles.cards}>
            <div className={styles.card}></div>
            <div className={styles.card}></div>
            <div className={styles.card}></div>
            <div className={styles.card}></div>
            <div className={styles.card}></div>
            <div className={styles.card}></div>
        </div>

        {/* Same area as Recently Added + Today's Events */}
        <div className={styles.bottomSection}>

            <div className={styles.recentlyAdded}></div>

            <div className={styles.todayEvents}></div>

        </div>

    </div>
  )
}
