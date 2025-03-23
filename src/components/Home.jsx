import ItemCard from "./cards/ItemCard";
import { useState, useEffect } from "react";
function Home(){
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
                <div className="widg-1">
                  <h1 className="home-title">THE PERFECT PLACE TO FIND EVENTS</h1>
                  <div className="home-items-1">
                  <div className="img-widg-1">
                    <img src="https://wordtracker-swoop-uploads.s3.amazonaws.com/uploads/ckeditor/pictures/2090/content_beach.jpg" className="home-img" />
                  </div>
                  <div className="home-text-1">
                    <h2>Events of all types</h2>
                    <p>Looking for an event? Looking to host an event?</p>
                    <p>Well you're in luck. You found the right place</p>
                    <h2>Scroll down to find the right event for you</h2>
                  </div>
                  </div>
                </div>
            </div>
            <div className="widget-2">
            <div className="event-heading"><h3>Events</h3></div>
            <ul className="event-list">
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