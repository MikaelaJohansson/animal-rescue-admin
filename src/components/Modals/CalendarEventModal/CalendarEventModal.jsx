import styles from "./CalendarEventModal.module.css"
import sideBarPawLogo from "../../../assets/sideBarPawLogo.png"

export default function CalendarEventModal({
    selectedEventId,
    selectedDate,
    setSelectedDate,
    eventTitle,
    setEventTitle,
    eventStartTime,
    setEventStartTime,
    eventEndTime,
    setEventEndTime,
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    closeEventModal
}) {


    return (
        <div className={styles.modalOverlay} onClick={closeEventModal}>

            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>

                <div className={styles.calendarEventHeader}>
                    <div className={styles.calendarEventHeaderLogo}>
                        <img src={sideBarPawLogo} alt="Logo paw" width={60}/>
                    </div>
                    
                    <p>
                        {selectedEventId ? "Update or delete the selected event." : "Fill in the details below to add an event."}
                    </p>
                </div>

                <h2>
                    <strong>{selectedEventId ? "Edit event" : "Add event"}</strong>
                </h2>

                <form className={styles.calendarEventForm} onSubmit={createCalendarEvent}>

                    <label htmlFor="eventTitle">
                        Title
                    </label>
                    <input
                        id="eventTitle"
                        type="text"
                        value={eventTitle}
                        onChange={(event) => setEventTitle(event.target.value)}
                        placeholder="Example: Walk Luna"
                        required
                    />

                    <label htmlFor="eventDate">
                        Date
                    </label>
                    <input
                        id="eventDate"
                        type="date"
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                        required
                    />

                    <label htmlFor="eventStartTime">
                        Start time
                    </label>
                    <input
                        id="eventStartTime"
                        type="time"
                        value={eventStartTime}
                        onChange={(event) => setEventStartTime(event.target.value)}
                        required
                    />

                    <label htmlFor="eventEndTime">
                        End time
                    </label>
                    <input
                        id="eventEndTime"
                        type="time"
                        value={eventEndTime}
                        onChange={(event) => setEventEndTime(event.target.value)}
                        required
                    />

                    <div className={styles.calendarEventButtonsContainer}>

                        {selectedEventId ? (
                            <>

                                <button
                                    className={styles.calendarEventUpdateButton}
                                    type="button"
                                    onClick={updateCalendarEvent}
                                >
                                    Update
                                </button>

                                <button
                                    className={styles.calendarEventDeleteButton}
                                    type="button"
                                    onClick={deleteCalendarEvent}
                                >
                                    Delete
                                </button>
                            
                            </>
                        ) : (
                            <>
                                <button
                                    className={styles.calendarEventCancelButton}
                                    type="button"
                                    onClick={closeEventModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    className={styles.calendarEventSaveButton}
                                    type="submit"
                                >
                                    Save event
                                </button>
                            </>
                        )}

                    </div>
                

                </form>

            </div>

        </div>
    )
}