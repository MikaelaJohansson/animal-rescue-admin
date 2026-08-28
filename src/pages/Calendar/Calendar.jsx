import { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";

import { auth, db } from "../../firebase";
import CalendarEventModal from "../../components/Modals/CalendarEventModal/CalendarEventModal";


export default function Calendar() {

    const [selectedDate, setSelectedDate] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState("");


    // Opens the modal for a new event
    function openAddEventModal(info) {

        setSelectedEventId("");
        setSelectedDate(info.dateStr);
        setEventTitle("");
        setEventTime("");
    }


    // Opens the modal with the selected event
    function openEditEventModal(info) {

        setSelectedEventId(info.event.id);
        setEventTitle(info.event.title);

        const eventDate = info.event.startStr.split("T")[0];
        const eventTime = info.event.startStr.split("T")[1].slice(0, 5);

        setSelectedDate(eventDate);
        setEventTime(eventTime);
    }


    // Closes the event modal
    function closeEventModal() {

        setSelectedEventId("");
        setSelectedDate("");
        setEventTitle("");
        setEventTime("");
    }


    // Creates a new calendar event in Firestore
    async function createCalendarEvent(event) {

        event.preventDefault();

        const currentUser = auth.currentUser;

        if (!currentUser) {
            return;
        }

        try {

            const calendarEventsCollection = collection(db, "calendarEvents");

            const newEventDocument = await addDoc(

                calendarEventsCollection, {
                    title: eventTitle,
                    date: selectedDate,
                    time: eventTime,
                    userId: currentUser.uid
                }

            );

            const newCalendarEvent = {

                id: newEventDocument.id,
                title: eventTitle,
                start: `${selectedDate}T${eventTime}`

            };

            setCalendarEvents((currentEvents) => [
                ...currentEvents,
                newCalendarEvent
            ]);

            closeEventModal();

        } catch (error) {
            console.error("Could not save calendar event:", error);
        }
    }


    // Updates the selected calendar event
    async function updateCalendarEvent() {

        if (!selectedEventId) {
            return;
        }

        try {

            const eventDocumentReference = doc(db, "calendarEvents", selectedEventId);

            await updateDoc(eventDocumentReference, {

                title: eventTitle,
                date: selectedDate,
                time: eventTime

            });

            setCalendarEvents((currentEvents) => {

                return currentEvents.map((event) => {

                    if (event.id === selectedEventId) {

                        return {
                            ...event,
                            title: eventTitle,
                            start: `${selectedDate}T${eventTime}`
                        };
                    }

                    return event;
                });
            });

            closeEventModal();

        } catch (error) {
            console.error("Could not update calendar event:", error);
        }
    }


    // Deletes the selected calendar event
    async function deleteCalendarEvent() {

        if (!selectedEventId) {
            return;
        }

        const userConfirmedDelete = window.confirm( `Are you sure you want to delete ${eventTitle}?`);

        if (userConfirmedDelete === false) {
            return;
        }

        try {

            const eventDocumentReference = doc(db, "calendarEvents", selectedEventId);

            await deleteDoc(eventDocumentReference);

            setCalendarEvents((currentEvents) => {

                return currentEvents.filter((event) => {
                    return event.id !== selectedEventId;
                });

            });

            closeEventModal();

        } catch (error) {
            console.error("Could not delete calendar event:", error);
        }
    }


    // Loads calendar events that belong to the signed-in user
    useEffect(() => {

        async function getCalendarEvents() {

            const currentUser = auth.currentUser;

            if (!currentUser) {
                return;
            }

            try {

                const calendarEventsCollection = collection(db, "calendarEvents");

                const calendarEventsQuery = query(

                    calendarEventsCollection, where("userId", "==", currentUser.uid)

                );

                const snapshot = await getDocs(calendarEventsQuery);


                const eventData = snapshot.docs.map((document) => {

                    const data = document.data();

                    return {
                        id: document.id,
                        title: data.title,
                        start: `${data.date}T${data.time}`
                    };

                });

                setCalendarEvents(eventData);

            } catch (error) {
                console.error("Could not load calendar events:", error);
            }
        }

        getCalendarEvents();

    }, []);


    return (

        <section className={styles.calendarMainContainer}>

            <div className={styles.calendarContainer}>
               
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={openAddEventModal}
                    eventClick={openEditEventModal}
                    events={calendarEvents}
                    height="70vh"
                    buttonText={{
                        today: "Today"
                    }}
                    eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    }}
                />

            </div>

          


            {selectedDate && (

                <CalendarEventModal
                    selectedEventId={selectedEventId}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    eventTitle={eventTitle}
                    setEventTitle={setEventTitle}
                    eventTime={eventTime}
                    setEventTime={setEventTime}
                    createCalendarEvent={createCalendarEvent}
                    updateCalendarEvent={updateCalendarEvent}
                    deleteCalendarEvent={deleteCalendarEvent}
                    closeEventModal={closeEventModal}
                />
            )}

        </section>
    );
}