import { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {addDoc,collection, getDocs,query, where} from "firebase/firestore";
import { auth, db } from "../../firebase";


export default function Calendar() {

    const [selectedDate, setSelectedDate] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [calendarEvents, setCalendarEvents] = useState([]);


    // Gets the date that the user clicks in the calendar
    function handleDateClick(info) {
        setSelectedDate(info.dateStr);
    }


    // Saves a new calendar event to Firestore
    // Saves a new calendar event to Firestore
    async function handleSaveEvent(event) {

        event.preventDefault();

        const currentUser = auth.currentUser;

        if (!currentUser) {
            return;
        }

        try {

            const calendarEventsCollection = collection(db, "calendarEvents");

            const newEventDocument = await addDoc(calendarEventsCollection, {
                title: eventTitle,
                date: selectedDate,
                time: eventTime,
                userId: currentUser.uid
            });

            const newCalendarEvent = {
                id: newEventDocument.id,
                title: eventTitle,
                start: `${selectedDate}T${eventTime}`
            };

            setCalendarEvents((currentEvents) => [
                ...currentEvents,
                newCalendarEvent
            ]);

            setEventTitle("");
            setEventTime("");
            setSelectedDate("");

        } catch (error) {
            console.error("Could not save calendar event:", error);
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

            const calendarEventsQuery = query( calendarEventsCollection, where("userId", "==", currentUser.uid) );

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

        <section>

            <h1>Calendar/ OBS....Under construction</h1>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                events={calendarEvents}

                eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }}

            />


            {selectedDate && (
                <div>
                    <div>

                        <h2>Add event</h2>

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
                                readOnly
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


                            <button type="button" onClick={() => setSelectedDate("")}> Cancel </button>

                            <button type="submit"> Save event </button>

                        </form>

                    </div>
                </div>
            )}

        </section>
    );
}