import styles from "./ListPageSkeleton.module.css"

export default function ListPageSkeleton() {
    return (
        <div className={styles.animalsSkeleton}>

            <div className={styles.animalsSkeletonHeaderContainer}>
                <div className={styles.animalsSkeletonHeader}></div> 
                <div className={styles.animalsSkeletonHeader}></div>
            </div>

            <div>
                <div className={styles.animalsSkeletonBodyLabels}></div>
                <div>
                    <div className={styles.animalsSkeletonBodyContent}></div>
                    <div className={styles.animalsSkeletonBodyContent}></div>
                    <div className={styles.animalsSkeletonBodyContent}></div>
                    <div className={styles.animalsSkeletonBodyContent}></div>
                    <div className={styles.animalsSkeletonBodyContent}></div>
                    <div className={styles.animalsSkeletonBodyContent}></div>
                    <div className={styles.animalsSkeletonBodyContent}></div>
                    <div className={styles.animalsSkeletonBodyContent}></div>
                    <div className={styles.animalsSkeletonBodyContent}></div>
                </div>

            </div>


        </div>
    )
}
