import styles from './CalendarSkeleton.module.css'

export default function CalendarSkeleton() {
  return (
    <div className={styles.calendarSkeletonMainContainer}>
        <div className={styles.calendarSkeletonButtons}></div>

        <div className={styles.calendarSkeletonBody}></div>
    </div>
  )
}
