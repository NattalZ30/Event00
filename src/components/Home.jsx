import ItemCard from "./cards/ItemCard";
import { useState, useEffect } from "react";
function Home({searchParams, setSearchParams}){
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/findEvents");
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
      }, []);
    return (
        <div className="home-page">
            <div className="bar-home"></div>
            <div className="widget">
                <div className="widg-1"><div className="img-widg-1"></div></div>
            </div>
            <div className="widget-2">
            <div className="event-heading"><h3>Events</h3></div>
            <ul>
                {events.length > 0 ? events.map((event, index) => (
                <ItemCard event={event}/>
                )) : <p>{message}</p>}
            </ul>
                <div className="widg-2"></div>
            </div>
        </div>
    )
}

export default Home