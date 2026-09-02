import { LuCalendarDays, LuArrowRight  } from "react-icons/lu";
import { Link } from "react-router-dom"                                                                                                         
import styles from "./TodaysSchedule.module.css"
import backgroundDog from "../../../assets/backgroundDog.png"

export default function TodaysSchedule({todayEvents}) {



    return (
        <section className={styles.scheduleContainer}>

            <h2> <LuCalendarDays /> Today's Events</h2>

            <div className={styles.scheduleList}>

                {todayEvents.length > 0 ? (

                    todayEvents.map((event) => {

                        return (
                            <Link key={event.id} to="/calendar" className={styles.scheduleEvent} >

                                <span className={styles.scheduleTime}>
                                    {event.time}
                                </span>

                                <span  className={styles.scheduleEventIcon}><LuCalendarDays /></span>

                                <span className={styles.scheduleEventTitle}>
                                    {event.title}
                                </span>

                            </Link>
                        )
                    })

                ) : (

                    <div className={styles.scheduleContainerNoEvent}>

                        <img src={backgroundDog} alt="background image of dog" />
                        <h3>Nothing scheduled for today.</h3>
                        <p>Enjoy a calm day!</p>

                        <hr />
                    </div>

                )}

                <Link to="/calendar" className={styles.calendarLink} >
                    View full calendar <LuArrowRight />
                </Link>

            </div>

        </section>
    )
}
