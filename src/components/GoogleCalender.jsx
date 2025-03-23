import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "376553211378-jl3cm1q0h753lefbipjv8ta6a0epfe6m.apps.googleusercontent.com";
const API_KEY = "AIzaSyCtYmqN0XaYMa1BdEabAcGNIp4hV47Uz78";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const GoogleCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [event, setEvent] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { event_id } = useParams(); // Get event_id from URL

  useEffect(() => {

    const fetchEvent = async () => {
      try{
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/findEvent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event_id }),
        });
    
        const data = await response.json();
        if (data.success){
          setEvent(data.details)
        }
      }catch(error){
        console.error("Error fetching events:", error);
        setMessage("Error loading events.");
      } finally {
        setLoading(false)
      }
    }
    fetchEvent();
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen(setIsSignedIn);
      });
    });
  }, []);

  // Sign in & store event_id in URL params
  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      navigate(`/event/${event_id}/add-to-calender`); // Replace with dynamic event_id
    });
  };

  // Sign out
  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    alert("Successfully signed out!");
    navigate(`/event/${event_id}/add-to-calender`);
  };

  // Add Event to Google Calendar
  const addEventToCalendar = async () => {
    if (!event_id) {
      alert("No event ID found!");
      return;
    }

    const eventDetails = {
      summary: event.title,
      start: { dateTime: event.start, timeZone: "Europe/London" },
      end: { dateTime: event.end, timeZone: "Europe/London" },
    };

    await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: eventDetails,
    });

    alert(`${event.title} added to Google Calendar!`);
  };

  return (
    <div>
      <div className="bar-home"></div>
      <div className="widget">
      <h1>{event.title}</h1>
      <p>Add event to your Google Calender</p>
      
      {!isSignedIn ? (
        <button onClick={handleSignIn}>Sign in with Google</button>
      ) : (
        <div className="calender-buttons">
          <button onClick={handleSignOut}>Sign Out</button>
          {event_id && <button onClick={addEventToCalendar}>Add Event to Calendar</button>}
        </div>
      )}
      {loading && <p className="loading-text">Loading...</p>}
    </div>
    </div>
  );
};

export default GoogleCalendar;
