import styles from './AdoptionDetailsSkeleton.module.css'

export default function AdoptionDetailsSkeleton() {
  return (
    <div className={styles.adoptionDetailsSkeletonMainContainer}>

        <div className={styles.adoptionDetailsSkeletonheaderBody}>
            <div className={styles.adoptionDetailsSkeletonheaderBodyContent}></div> 
            <div className={styles.adoptionDetailsSkeletonheaderBodyContent}></div>
        </div>

        <div className={styles.adoptionDetailsSkeletonBody}>
            <div className={styles.adoptionDetailsSkeletonheaderBodyContentLower}></div>
            <div className={styles.adoptionDetailsSkeletonheaderBodyContentLower}></div>
        </div>
    </div>
  )
}
