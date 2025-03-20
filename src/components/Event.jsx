import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddEvent from "./AddEvent";
function Event({username}) {
  const { event_id } = useParams(); // Get event_id from URL
  const [event, setEvent] = useState(null);
  const [toAdd, setToAdd] = useState(false)
  const [message, setMessage] = useState("");

  console.log(event_id)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/event/${event_id}`);
        const data = await response.json();
        if (data.success) {
          setEvent(data.event);
        } else {
          setMessage("Event not found.");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setMessage("Error loading event details.");
      }
    };

    fetchEvent();
  }, [event_id]);

  const handleAdd = () => {
    setToAdd(true)
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/event/${event_id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        alert("Event deleted successfully!");
        navigate("/"); // Redirect to home after deletion
      } else {
        alert("Failed to delete event: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event.");
    }
  };

  if (message) return <p>{message}</p>;
  if (!event) return <p>Loading event details...</p>;

  if (toAdd){
    return (
        <AddEvent event={event}/>
    )
  }
  return (
    <div className="event-page">
        <div className="bar-home"></div>
        <div className="event-content">
        <h1>{event.title}</h1>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <div className="add-delete-buttons">
            <button onClick={handleAdd}>Add</button>
            {username==event.posted_by? <button onClick={handleDelete}>Delete</button>: null}
        </div>
        </div>
        
    </div>
  );
}

export default Event;
