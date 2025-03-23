import { useEffect, useState } from "react";
import ItemCard from "./cards/ItemCard";
function MyAccount({
    isLoggedIn,
    username
}){
    const [details, setDetails] = useState({})
    const [events, setEvents] = useState([])
    const [message, setMessage] = useState([])
    useEffect(() => {
        const fetchDetails = async () => {
            try {
            const response = await fetch("http://localhost:5000/api/findUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
                });
            const data = await response.json();
    
            if (data.success) {
                setDetails(data.details);
            } else {
                setMessage(data.message);
            }
            } catch (error) {
            console.error("Error fetching events:", error);
            setMessage("Error loading events.");
            }
        };

        const fetchEvents = async () => {
            try {
            const response = await fetch("http://localhost:5000/api/findEventsByUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
                });
            const data = await response.json();
    
            if (data.success) {
                setEvents(data.events);
            } else {
                setMessage(data.message);
            }
            } catch (error) {
            console.error("Error fetching events:", error);
            setMessage("Error loading events.");
            }
        };
    
        fetchEvents();
        fetchDetails();
    }, []);

    return (
        <div className="insights-page">
            <div className="bar-home"></div>
            <div className="widget-account">
                <h2>My Details</h2>
                <div>
                <p><strong>Username:</strong> {details.username}</p>
                <p><strong>Email:</strong> {details.email}</p>
                <p><strong>Password:</strong> {details.password ?details.password.split("").map((char) => "*"): ""}</p>
                </div>
            </div>
            <div className="widget">
                <h2>My Events</h2>
                <div><ul className="event-list">
                {events.length > 0 ? events.map((event, index) => (
                <ItemCard event={event}/>
                )) : null}
            </ul></div>
            </div>
        </div>
    )
}

export default MyAccount