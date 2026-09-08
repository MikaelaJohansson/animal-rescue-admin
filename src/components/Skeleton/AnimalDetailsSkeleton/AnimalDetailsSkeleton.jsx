import styles from './AnimalDetailsSkeleton.module.css'

export default function AnimalDetailsSkeleton() {
  return (
    <div className={styles.AnimalDetailsSkeletonMainContainer}>

        <div className={styles.AnimalDetailsSkeletonHeader}></div>

        <div >
            <div className={styles.AnimalDetailsSkeletonOverview}></div>
        </div>

        <div>
            <div className={styles.AnimalDetailsSkeletonSummary}></div>
        </div>

    </div>
  )
}
