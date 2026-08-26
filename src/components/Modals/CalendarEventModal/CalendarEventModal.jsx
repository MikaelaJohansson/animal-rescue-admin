
import styles from "./CalendarEventModal.module.css"

export default function CalendarEventModal({ 
    selectedEventId,
    selectedDate,
    setSelectedDate,
    eventTitle,
    setEventTitle,
    eventTime,
    setEventTime,
    handleSaveEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    handleCloseModal
}) {


        
    return (
      <div className={styles.modalOverlay}>

            <div className={styles.modal}>

                <h2>
                    {selectedEventId ? "Edit event" : "Add event"}
                </h2>

                <form onSubmit={handleSaveEvent}>

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
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>

                    {selectedEventId ? (
                        <>
                            <button
                                type="button"
                                onClick={handleDeleteEvent}
                            >
                                Delete
                            </button>

                            <button
                                type="button"
                                onClick={handleUpdateEvent}
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
