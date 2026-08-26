import styles from "./CalendarEventModal.module.css"

export default function CalendarEventModal({
    selectedEventId,
    selectedDate,
    setSelectedDate,
    eventTitle,
    setEventTitle,
    eventTime,
    setEventTime,
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    closeEventModal
}) {


    return (
        <div className={styles.modalOverlay}>

            <div className={styles.modal}>

                <h2>
                    {selectedEventId ? "Edit event" : "Add event"}
                </h2>

                <form onSubmit={createCalendarEvent}>

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

                    <label htmlFor="eventTime">
                        Time
                    </label>

                    <input
                        id="eventTime"
                        type="time"
                        value={eventTime}
                        onChange={(event) => setEventTime(event.target.value)}
                        required
                    />

                    <button
                        type="button"
                        onClick={closeEventModal}
                    >
                        Cancel
                    </button>

                    {selectedEventId ? (
                        <>
                            <button
                                type="button"
                                onClick={deleteCalendarEvent}
                            >
                                Delete
                            </button>

                            <button
                                type="button"
                                onClick={updateCalendarEvent}
                            >
                                Update
                            </button>
                        </>
                    ) : (
                        <button type="submit">
                            Save event
                        </button>
                    )}

                </form>

            </div>

        </div>
    )
}