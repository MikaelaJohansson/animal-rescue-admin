import React from 'react'
import styles from "./TodaysSchedule.module.css"
import { Link } from "react-router-dom"

export default function TodaysSchedule({todayEvents}) {



    return (
        <section className={styles.scheduleContainer}>

            <h2>Today's Events</h2>

            <div className={styles.scheduleList}>

                {todayEvents.length > 0 ? (

                todayEvents.map((event) => {

                    return (

                        <Link
                            key={event.id}
                            to="/calendar"
                            className={styles.scheduleEvent}
                        >
                            <span className={styles.scheduleTime}>
                                {event.time}
                            </span>

                            <span>
                             {event.title}
                            </span>
                        </Link>
                    )

                })) : (

                    <p>Nothing scheduled for today.</p>

                )}

            </div>

        </section>
    )
}
